import { CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../componenets/Navbar'

function Layout() {
  return (
    <>
    <CssBaseline/>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Layout