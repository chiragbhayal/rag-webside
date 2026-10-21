import React from "react";
import AnnouncementBar from "./Header/AnnouncementBanner";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

/**
 * Page shell: header -> sale strip -> content -> footer
 * (HealthKart places the offer strip directly below the header.)
 */
const Wrapper = () => {
  return (
    <>
      <Navbar />
      <AnnouncementBar />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Wrapper;
