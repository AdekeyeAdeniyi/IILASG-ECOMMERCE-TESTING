// src/layouts/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navigation from "@/components/custom/Navigation";
import Sidebar from "@/components/custom/Sidebar";
import Footer from "@/components/custom/Footer";

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 py-6 px-5">
          <Outlet />
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default MainLayout;
