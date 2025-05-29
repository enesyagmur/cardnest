import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between  bg-gradient-to-br from-[#a8edea] via-[#fed6e3] to-[#d6c1ff] ">
      <Header />
      <main className="w-11/12 md:h-[590px] flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
