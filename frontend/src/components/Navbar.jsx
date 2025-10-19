import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.username
    ? user.username.split(" ").map((n) => n[0]).join("").toUpperCase() : "U";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white flex items-center justify-between px-6 py-3 shadow-md z-50">
      {/* App Logo / Title */}
      <Link to="/dashboard">
        <h2 className="text-xl font-medium text-black py-2">Notes App</h2>
      </Link>

      {/* User Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropDownOpen(!dropDownOpen)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
            {initials}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.username || "User"}
          </span>

          <MdKeyboardArrowDown
            className={`text-gray-600 text-lg transition-transform ${
              dropDownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {dropDownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100">
           
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 cursor-default">
              Account
            </div>

            <Link
              to="/profile"
              onClick={() => setDropDownOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 flex items-center gap-2">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
