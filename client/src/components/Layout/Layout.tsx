import {  Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CssBaseline } from "@mui/material";
// import { useTypedSelector } from "../../redux/store";
// import { useEffect } from "react";

const Layout = () => {
//   const {type, accessToken, status, isAuthenticated }=useTypedSelector(state=> state.authState)
//   // console.log('authState', authState)
//   const navigate=useNavigate();
//   useEffect(()=>{
//     if(!isAuthenticated){
//       navigate("/login");
//     }
// },[isAuthenticated, navigate]);
  return (
    <>
    <CssBaseline />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
