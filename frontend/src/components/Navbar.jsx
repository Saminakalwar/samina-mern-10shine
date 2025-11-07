import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useNotes from "../hooks/useNotes";
import useProfile  from "../hooks/useProfile";
import SearchBar from "./SearchBar";

const Navbar = ({ collapsed = false }) => {
  const { user, logout } = useAuth();
  const { profilePic , resetProfile} = useProfile();
  const { searchNotes, fetchNotes, searchQuery, setSearchQuery } = useNotes();

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();
  const showSearch = location.pathname === "/dashboard";

  // Theme setup
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


    const handleLogout = () => {
    logout();        // clears token & auth data
    resetProfile();  // clears cached profile info
    navigate("/login");
  };

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      if (searchQuery.trim()) searchNotes(searchQuery);
      else fetchNotes();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchQuery, user]);

  const handleSearch = async () => {
    if (searchQuery.trim()) await searchNotes(searchQuery);
    else await fetchNotes();
  };

  const onClearSearch = async () => {
    setSearchQuery("");
    await fetchNotes();
  };

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <nav
      className={`fixed top-0 right-0 ${
        user ? (collapsed ? "left-20" : "left-64") : "left-0"
      } 
      bg-[#D6CCC2] dark:bg-gray-800 
      text-gray-900 dark:text-gray-100 
      flex items-center justify-between px-6 py-3 
       border-b border-gray-200 dark:border-gray-700 
      z-40 transition-all duration-300`}
    >
      {!user && (
        <Link to="/login">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Notes App
          </h2>
        </Link>
      )}

      {user && showSearch && (
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}


      {/* 🌗 Right Section */}
      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === "light" ? <BsMoon size={18} /> : <BsSun size={18} />}
        </button>

        {!user ? (
          <Link
            to="/login"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Login
          </Link>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropDownOpen(!dropDownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-800 dark:text-white font-semibold">
                    {initials}
                  </span>
                )}
              </div>

          <span className="gradient-animated text-sm font-semibold">{user?.username}</span>


              <MdKeyboardArrowDown
                className={`text-gray-600 dark:text-gray-300 text-lg transition-transform ${
                  dropDownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropDownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#F5EBE0] dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-600">
                  Account
                </div>

                <Link
                  to="/profile"
                  onClick={() => setDropDownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out?"))
                      handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
