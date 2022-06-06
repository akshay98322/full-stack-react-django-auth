import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert, CircularProgress } from "@mui/material"
import { useDispatch } from 'react-redux';

import { getToken, storeToken } from "../../services/LocalStorageService";
import { useLoginUserMutation } from '../../services/userAuthApi';
import { setUserToken } from '../../features/authSlice';

const UserLogin = () =>{

    const [ loginUser, {isLoading}] = useLoginUserMutation();
    const [serverError, setServerError] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email'),
            password: data.get('password')
        };
        const response = await loginUser(actualData);
        if (response.error){
          setServerError(response.error.data.errors);
        }
        if (response.data){
            storeToken(response.data.token);
            let {access_token} = getToken();
            dispatch(setUserToken({access_token: access_token}));
            navigate('/dashboard');
        } 
    }
    
    let {access_token} = getToken();
    useEffect( () => {
      dispatch(setUserToken({access_token: access_token}))
    }, [access_token, dispatch]);

  return (
    <>
    <Box component='form' noValidate id='login-form' onSubmit={handleSubmit}>
        <TextField required fullWidth margin='normal' id='email' name='email' label='Email' type='email' />
        {serverError.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10}}>{serverError.email[0]}</Typography> : ""}
        <TextField required fullWidth margin='normal' id='password' name='password' label='Password' type='password'/>
        {serverError.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10}}>{serverError.password[0]}</Typography> : ""}
        <Box textAlign='center'>{ isLoading ? <CircularProgress/> : <Button type='submit' variant='contained' sx={{mt: 3, mb: 2, px:5}}>Login</Button>}</Box>
        <NavLink to='/sendpassresemail'>Forgot Password ?</NavLink>
        {serverError.non_field_errors ? <Alert severity="error" >{serverError.non_field_errors[0]}</Alert> : ""}
    </Box>
    </>
  )
}

export default UserLogin;