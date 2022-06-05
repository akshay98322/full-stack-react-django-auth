import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Layout from "./pages/Layout";
import Contact from './pages/Contact';
import LoginReg from './pages/auth/LoginReg';
import SendPassResEmail from './pages/auth/SendPassResEmail';
import ResetPass from './pages/auth/ResetPass';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='login' element={<LoginReg/>} />
        <Route path='sendpassresemail' element={<SendPassResEmail/>} />
        <Route path='reset' element={<ResetPass/>} />
        <Route path='dashboard' element={<Dashboard/>} />
      </Route>
    </Routes>
    </BrowserRouter>
    {/* <Layout/> */}
    </>
  );
}

export default App;
