import React from "react";
import { Navbar, Footer } from "../components";
const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
      {props.children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
