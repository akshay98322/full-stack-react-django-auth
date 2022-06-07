import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {Grid, TextField, Button, Box, Alert, Typography } from "@mui/material"

import { useResetPasswordMutation } from '../../services/userAuthApi'


function ResetPass() {
    const [serverError, setServerError] = useState({})
    const [serverMsg, setServerMsg] = useState({})
    const [ resetPassword ] = useResetPasswordMutation()
    const { id, token } = useParams()

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password: data.get('password'),
            password2: data.get('password2'),
        };
        const response = await resetPassword({actualData, id, token});
        if (response.error) {
            setServerMsg({});
            setServerError(response.error.data.errors);
        }
        if (response.data) {
            setServerError({});
            setServerMsg(response.data);
            document.getElementById("pass-reset-form").reset();
            setTimeout(()=>{ navigate('/login') }, 3000)
        }

    }
  return (
    <>
    <Grid container justifyContent='center'>
        <Grid item sm={6} xs={12}>
            <h1>Reset Password</h1>
            <Box component='form' noValidate id='pass-reset-form' onSubmit={handleSubmit}>
                <TextField required fullWidth margin='normal' id='password' name='password' label='New Password' type='password'/>
                {serverError.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10}}>{serverError.password[0]}</Typography> : ""}
                <TextField required fullWidth margin='normal' id='password2' name='password2' label='Confirm New Password' type='password'/>
                {serverError.password2 ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10}}>{serverError.password2[0]}</Typography> : ""}
                <Box textAlign='center'><Button type='submit' variant='contained' sx={{mt: 3, mb: 2, px:5}}>Submit</Button></Box>
                {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : "" }
                {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : "" }
            </Box>
        </Grid>
    </Grid>
    </>
  )
}

export default ResetPass