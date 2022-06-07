import React, { useState } from "react";
import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";

import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";

function SendPassResEmail() {
  const [serverError, setServerError] = useState({});
  const [serverMsg, setServerMsg] = useState({});
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };
    const response = await sendPasswordResetEmail(actualData);
    if (response.error) {
      setServerMsg({});
      setServerError(response.error.data.errors);
    }
    if (response.data) {
      setServerError({});
      setServerMsg(response.data);
      document.getElementById("pass-reset-email-form").reset();
    }
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            id="pass-reset-email-form"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email"
              type="email"
            />
            {serverError.email ? (
              <Typography
                style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
              >
                {serverError.email[0]}
              </Typography>
            ) : (
              ""
            )}
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
              >
                Reset Password
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
        </Grid>
      </Grid>
    </>
  );
}

export default SendPassResEmail;
