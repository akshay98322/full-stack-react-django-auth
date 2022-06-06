import { useNavigate } from "react-router-dom";
import {Button, CssBaseline, Grid, Typography} from "@mui/material";

import ChangePass from "./auth/ChangePass";
import { removeToken } from "../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { unsetUserToken } from "../features/authSlice";



function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(unsetUserToken({access_token: null}));
        removeToken();
        navigate("/login");
    }

  return (
    <>
        <CssBaseline />
        <Grid container justifyContent="center">
            <Grid item sm={4} sx={{ backgroundColor: 'gray', p:5, color: 'white'}}>
                <h1>Dashboard</h1>
                <Typography variant="h5">Email: user1@example.com</Typography>
                <Typography variant="h6">Name: FirstName LastName</Typography>
                <Button variant="contained" color="warning" size="large" onClick={handleLogout} sx={{mt: 8}}>Logout</Button>
            </Grid>
            <Grid item sm={4}>
                <ChangePass/>
            </Grid>
        </Grid>
    </>
  )
}

export default Dashboard