import React from "react";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  // Generating initials from Username
  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map((word) => word[0]).join("").toUpperCase();
  };


  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 min-h-screen bg-gray-100 pb-20">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome {user?.fullname || "User"} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Start your day with a note!
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Profile Row */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-500 text-white w-14 h-14 flex items-center justify-center rounded-full text-xl font-semibold">
                {getInitials(user?.fullname)}
              </div>
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-800">
                  {user?.fullname || "Loading..."}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user?.fullname || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{user?._id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">Pakistan</p>
              </div>
            </div>
          </div>

          {/* Professional Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Professional Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a
                href="https://www.linkedin.com/in/samina-kalwar"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:underline"
                >
                linkedin.com/in/samina-kalwar
                </a>

              </div>
              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="font-medium">
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
