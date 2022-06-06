import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CssBaseline, Grid, Typography } from "@mui/material";

import ChangePass from "./auth/ChangePass";
import { setUserInfo,unsetUserInfo } from "../features/userSlice";
import { unsetUserToken } from "../features/authSlice";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { getToken, removeToken } from "../services/LocalStorageService";

function Dashboard() {
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });
  // Store user data in local state
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
      });
    }
  }, [data, isSuccess]);
  
  // Store user data in redux store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.email,
          name: data.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(unsetUserToken({ access_token: null }));
    dispatch(unsetUserInfo({ name: null, email: null }));
    removeToken();
    navigate("/login");
  };

  return (
    <>
      <CssBaseline />
      <Grid container justifyContent="center">
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          <h1>Dashboard</h1>
          <Typography variant="h5">Email: {userData.email}</Typography>
          <Typography variant="h6">Name: {userData.name}</Typography>
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            Logout
          </Button>
        </Grid>
        <Grid item sm={4}>
          <ChangePass />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
