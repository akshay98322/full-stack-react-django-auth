import {Button, CssBaseline, Grid, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePass from "./auth/ChangePass";


function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        console.log("clicked");
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