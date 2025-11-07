import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { user } = useAuth();
const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5EBE0] dark:bg-gray-900">
     {user && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}

      <div
  className={`flex-1 flex flex-col transition-all duration-300 ${
    user ? (collapsed ? "ml-20" : "ml-64") : "ml-0"
  }`}
>
        {/* Pass collapsed state to Navbar */}
        <div className="sticky top-0 z-40">
          <Navbar collapsed={collapsed} />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
