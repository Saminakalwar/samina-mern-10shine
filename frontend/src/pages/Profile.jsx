import React, { useState, useRef, useEffect } from "react";
import {
  FiEdit,
  FiSave,
  FiCamera,
  FiUser,
  FiMail,
  FiGlobe,
  FiClock,
  FiLinkedin,
  FiGithub,
  FiLogOut,
  FiTrash2,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import  useProfile  from '../hooks/useProfile'
import toast, { Toaster } from "react-hot-toast";
import useNotes from "../hooks/useNotes"

export default function Profile() {
  const { user, logout } = useAuth();
  const {
    profileData,
    setProfileData,
    profilePic,
    uploadProfilePic,
    removeProfilePic,
    updateProfile,
    deleteAccount,
    // count,
    saving,
    resetProfile
  } = useProfile();
 

  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { notes } = useNotes();
  const count = notes?.length || 0;

//handle user click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const success = await updateProfile(profileData);
    if (success) setIsEditing(false);
  };

  const handleLogout = () => {
  logout();        // clears token & auth data
  resetProfile();  // clears cached profile info
  navigate("/login");
};

  if (!user) return null;

  return (
    <>
      <Toaster position="top-right" />
      {/* <Navbar /> */}
      <div className="min-h-screen pt-16 px-3 bg-[#F5EBE0] dark:bg-gray-900 flex justify-center text-gray-900 dark:text-gray-100 overflow-hidden">
        <div className="w-full max-w-4xl bg-[#D6CCC2] dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold gradient-animated">
            Welcome, {user?.username || "User"} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Manage your profile and preferences
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: Profile Card */}
            <div className="flex flex-col items-center bg-[#F5EBE0] dark:bg-gray-700 rounded-xl p-5 shadow-sm">
              <div className="relative mb-3" ref={menuRef}>
                <img
                  src={profilePic || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500 shadow-sm"
                />


                {/* Profile image Camera / Menu */}
                <div className="absolute bottom-1 right-1">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-sm transition"
                  >
                    <FiCamera size={14} />
                  </button>

                  {showMenu && (
                    <div className="absolute right-0 mt-2 bg-[#F5EBE0] dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md w-36 z-10">
                      {!profilePic && (
                        <label
                          htmlFor="upload-pic"
                          className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          Upload Picture
                        </label>
                      )}
                      {profilePic && (
                        <>
                          <label
                            htmlFor="upload-pic"
                            className="block px-4 py-2 text-sm hover:bg-[#E3D2C3] dark:hover:bg-gray-700 cursor-pointer"
                          >
                            Update Picture
                          </label>
                          <button
                            onClick={() => removeProfilePic(() => setShowMenu(false))} // ✅ closes menu
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#E3D2C3] dark:hover:bg-gray-700"
                          >
                            Remove Picture
                          </button>
                        </>
                      )}
                      <input
                        id="upload-pic"
                        type="file"
                        accept="image/*"
                        className="hidden"
                         onChange={(e) => {
                          uploadProfilePic(e.target.files[0], () => setShowMenu(false)); // ✅ closes menu
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-base font-semibold flex items-center gap-1">
                <FiUser /> {user?.username}
              </h2>
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <FiMail /> {user?.email}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Joined {new Date(user?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>

              {/* Total notes Count with Animations */}
              <div className="flex justify-center mt-6">
                <div className="relative flex flex-col items-center">
                  <span
                    className="text-4xl font-extrabold text-green-600 animate-pulse-number"
                  >
                    {count}
                  </span>
                  <span className="mt-2 font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
                    Total Notes
                  </span>
                </div>
              </div>


              {/* Logout */}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to log out?")) handleLogout();
                }}
                className="mt-8 flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-red-800 hover:bg-red-900 rounded-md shadow-sm transition-all">

                <FiLogOut className="text-lg" />
                Logout
              </button>
            </div>

            {/* RIGHT: User Editable Info */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  disabled={saving}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    isEditing
                      ? "bg-green-600 hover:bg-green-700 text-white animate-pulse"
                      : "bg-[#8C7E73] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white"
                  }`}
                >
                  {isEditing ? <FiSave /> : <FiEdit />}
                  {saving ? "Saving..." : isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormInput
                  label="Full Name"
                  name="fullname"
                  type="text"
                  value={profileData.fullname || user?.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  icon={<FiUser className="text-green-700" />}
                />
                <FormInput
                  label="Gender"
                  name="gender"
                  type="select"
                  value={profileData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  options={["Female", "Male", "Other"]}
                  icon={<FiUser className="text-green-700" />}
                />
                <FormInput
                  label="Country"
                  name="country"
                  type="text"
                  value={profileData.country}
                  onChange={handleChange}
                  disabled={!isEditing}
                  icon={<FiGlobe className="text-green-700" />}
                />
                <FormInput
                  label="Language"
                  name="language"
                  type="text"
                  value={profileData.language}
                  onChange={handleChange}
                  disabled={!isEditing}
                  icon={<FiGlobe className="text-green-700" />}
                />
                <FormInput
                  label="Time Zone"
                  name="timezone"
                  type="text"
                  value={profileData.timezone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  icon={<FiClock className="text-green-700" />}
                />
                <FormInput
                  label="LinkedIn"
                  name="linkedin"
                  type="url"
                  value={profileData.linkedin}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/in/username"
                  icon={<FiLinkedin className="text-green-700" />}
                />
                <FormInput
                  label="GitHub"
                  name="github"
                  type="url"
                  value={profileData.github}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="https://github.com/username"
                  icon={<FiGithub className="text-green-700" />}
                />
              </form>

              {/* ⚠️ Danger Zone */}
              <div className="mt-8 border-t border-red-500/30 pt-4">
                <h3 className="text-red-500 text-sm font-semibold mb-3">
                  ⚠️ Danger Zone
                </h3>
                <button
                  onClick={deleteAccount}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-red-800 hover:bg-red-900 rounded-md shadow-sm transition-all"

                >
                  <FiTrash2 className="text-lg" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* Reusable Input */
const FormInput = ({ label, name, type, value, onChange, disabled, icon, options = [], placeholder }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-xs font-semibold text-gray-700 dark:text-gray-300">{label}</label>
    <div
      className={`flex items-center gap-2 px-2 py-1 rounded-md border text-xs shadow-sm ${
        disabled
          ? "bg-[#F5EBE0] dark:bg-gray-700 text-gray-400 border-gray-300 dark:border-gray-600 cursor-not-allowed"
          : "bg-[#F5EBE0] dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500"
      } transition`}
    >
      <span className="text-gray-500">{icon}</span>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-100"
        >
          <option value="">Select gender</option>
          {options.map((opt) => (
            <option key={opt} className="dark:bg-gray-800 bg-[#F5EBE0]">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400"
        />
      )}
    </div>
  </div>
);