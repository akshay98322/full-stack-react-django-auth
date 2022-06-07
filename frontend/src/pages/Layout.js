import { Outlet } from "react-router-dom";
import Navbar from "../componenets/Navbar";
import { CssBaseline } from "@mui/material";

function Layout() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;
