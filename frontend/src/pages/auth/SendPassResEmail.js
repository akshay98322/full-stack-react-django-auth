import {Grid, TextField, Button, Box, Alert } from "@mui/material"
import React, { useState } from 'react'

function SendPassResEmail() {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    });
    // const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email'),
        };
        if (actualData.email) {
            setError({status: true, msg: "Email sent", type: "success"});
            document.getElementById('pass-reset-email-form').reset();
            // navigate('/');
        } else {
            setError({status: true, msg: "Please provide Email", type: "error"});
        }

    }
  return (
    <>
    <Grid container justifyContent='center'>
        <Grid item sm={6} xs={12}>
            <Box component='form' noValidate id='pass-reset-email-form' onSubmit={handleSubmit}>
                <TextField required fullWidth margin='normal' id='email' name='email' label='Email' type='email' />
                <Box textAlign='center'><Button type='submit' variant='contained' sx={{mt: 3, mb: 2, px:5}}>Reset Password</Button></Box>
                {error.status ? <Alert severity={error.type}>{error.msg}</Alert>: null}
            </Box>
        </Grid>
    </Grid>
    </>
  )
}

export default SendPassResEmail