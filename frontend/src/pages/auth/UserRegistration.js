import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Alert,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

import { storeToken } from "../../services/LocalStorageService";
import { useRegisterUserMutation } from "../../services/userAuthApi";

const UserRegistration = () => {
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: data.get("tc"),
    };
    const response = await registerUser(actualData);
    if (response.error) {
      setServerError(response.error.data.errors);
    }
    if (response.data) {
      storeToken(response.data.token);
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Box
        component="form"
        noValidate
        id="registration-form"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Name"
        />
        {serverError.name ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.name[0]}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          required
          fullWidth
          margin="normal"
          id="email"
          name="email"
          label="Email"
        />
        {serverError.email ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.email[0]}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          required
          fullWidth
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
        />
        {serverError.password ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.password[0]}
          </Typography>
        ) : (
          ""
        )}
        <TextField
          required
          fullWidth
          margin="normal"
          id="password2"
          name="password2"
          label="Confirm Password"
          type="password"
        />
        {serverError.password2 ? (
          <Typography style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.password2[0]}
          </Typography>
        ) : (
          ""
        )}
        <FormControlLabel
          control={<Checkbox value={true} color="primary" name="tc" id="tc" />}
          label="I agree to Terms and Conditions"
        />
        {serverError.tc ? (
          <span style={{ fontSize: 12, color: "red", paddingLeft: 10 }}>
            {serverError.tc[0]}
          </span>
        ) : (
          ""
        )}
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Sign Up
          </Button>
        </Box>
        {serverError.non_field_errors ? (
          <Alert severity="error">{serverError.non_field_errors[0]}</Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default UserRegistration;
