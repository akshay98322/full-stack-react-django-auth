import { TextField, Button, Box, Alert } from "@mui/material"
import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";

function UserLogin() {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email'),
            password: data.get('password')
        };
        if (actualData.email && actualData.password) {
            document.getElementById('login-form').reset();
            setError({status: true, msg: "Login Success", type: "success"});
            navigate('/dashboard');
        } else {
            setError({status: true, msg: "Please fill all the fields", type: "error"});
        }

    }
  return (
    <>
    <Box component='form' noValidate id='login-form' onSubmit={handleSubmit}>
        <TextField required fullWidth margin='normal' id='email' name='email' label='Email' type='email' />
        <TextField required fullWidth margin='normal' id='password' name='password' label='Password' type='password'/>
        <Box textAlign='center'><Button type='submit' variant='contained' sx={{mt: 3, mb: 2, px:5}}>Login</Button></Box>
        <NavLink to='/sendpassresemail'>Forgot Password ?</NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert>: null}
    </Box>
    </>
  )
}

export default UserLogin