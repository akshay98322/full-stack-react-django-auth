import { TextField, Button, Box, Alert } from "@mui/material"
import React, {useState} from 'react'

function ChangePass() {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password: data.get('password'),
            password2: data.get('password2'),
        };
        if (actualData.password && actualData.password2) {
            if (actualData.password === actualData.password2) {
                document.getElementById('pass-change-form').reset();
                setError({status: true, msg: "Password Reset Success", type: "success"});
            } else {
                setError({status: true, msg: "Password and Confirm Password doesn't match", type: "error"});
            }
        } else {
            setError({status: true, msg: "Please fill all the fields", type: "error"});
        }

    }
  return (
    <>
    <Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx:4}}>
        <h1>Change Password</h1>
        <Box component='form' onSubmit={handleSubmit}  noValidate sx={{mt: 1}} id='pass-change-form'>
            <TextField margin='normal' required fullWidth name='password' label='New Password' type='password' id='password'  />
            <TextField margin='normal' required fullWidth name='password2' label='Confirm New Password' type='password' id='password2' />
            <Box textAlign='center'><Button type='submit' variant='contained' sx={{mt: 3, mb: 2, px:5}}>Update</Button></Box>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert>: null}
        </Box>

    </Box>
    </>
  )
}

export default ChangePass