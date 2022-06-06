import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { TextField, Button, Box, Alert, Typography } from "@mui/material";

import { useChangeUserPasswordMutation } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";

function ChangePass() {
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState({});
  const [changeUserPassword] = useChangeUserPasswordMutation();
  const { access_token } = getToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      password2: data.get("password2"),
    };
    const response = await changeUserPassword({ actualData, access_token });
    if (response.error) {
        setServerMsg({});
        setServerError(response.error.data.errors);
    }
    if (response.data) {
        setServerError({});
        setServerMsg(response.data);
        console.log(response.data)
        document.getElementById("pass-change-form").reset();
    }
  };
  // getting user data from redux store
  // const userData = useSelector((state) => state.user);
  //   console.log(userData);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          maxWidth: 600,
          mx: 4,
        }}
      >
        <h1>Change Password</h1>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          id="pass-change-form"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
          />
          {serverError.password ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {" "}
              {serverError.password[0]}{" "}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm New Password"
            type="password"
            id="password2"
          />
          {serverError.password2 ? (
            <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
              {" "}
              {serverError.password2[0]}{" "}
            </Typography>
          ) : (
            ""
          )}
          <Box textAlign="center">
            {" "}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Update
            </Button>
          </Box>
          {serverError.non_field_errors ? (
            <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
          ) : (
            ""
          )}
          {serverMsg.msg ? (
            <Alert severity="success">{serverMsg.msg}</Alert>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
}

export default ChangePass;
