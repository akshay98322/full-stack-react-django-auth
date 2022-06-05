import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
      <>
        <Box sx={{flexGrow: 1}}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <Typography variant="h5" component="div" sx={{flexGrow: 1}}>React Login UI</Typography>
              <Button color="inherit" component={NavLink} to="/" style={({isActive})=>{return {backgroundColor: isActive ? "#6d1b7b": ""}}}>Home</Button>
              <Button color="inherit" component={NavLink} to="/contact" style={({isActive})=>{return {backgroundColor: isActive ? "#6d1b7b": ""}}}>Contact</Button>
              <Button color="inherit" component={NavLink} to="/login" style={({isActive})=>{return {backgroundColor: isActive ? "#6d1b7b": ""}}}>Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </>
  )
}

export default Navbar