import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from './pages/Home'
import Layout from "./pages/Layout";
import Contact from './pages/Contact';
import LoginReg from './pages/auth/LoginReg';
import SendPassResEmail from './pages/auth/SendPassResEmail';
import ResetPass from './pages/auth/ResetPass';
import Dashboard from './pages/Dashboard';

function App() {
  const { access_token } = useSelector(state => state.auth);
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='login' element={access_token ? <Navigate to="/dashboard"/> : <LoginReg/>} />
        <Route path='sendpassresemail' element={<SendPassResEmail/>} />
        <Route path='api/user/reset-pass/:id/:token/' element={<ResetPass/>} />  {/* As we dont have base url for this so mentioned full path */}
        <Route path='dashboard' element={access_token ? <Dashboard/>: <Navigate to="/login"/> } />
      </Route>
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
