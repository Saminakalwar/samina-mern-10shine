import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import { validateEmail } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const {login} = useAuth(); //custom hook
    const navigate = useNavigate(); // hook

    const handleLogin = async(e)=>{
      e.preventDefault(); //prevent the default behavior of form submission from reloading the page on user reclick

      if (!email) return setError("Please enter the email address.");
      if (!password) return setError("Please enter the password.");
      if (!validateEmail(email)) return setError("Please enter a valid email address");

      setError(null);
      setLoading(true);

      // Login API call
      try{
        await login(email, password);
        navigate('/dashboard');
      }
      catch(err){
      alert(err.response?.data?.message || 'Login failed');
      }
      finally {
          setLoading(false);
        }
    }

  return (
    <>
      <Navbar />

      {/* Centered container */}
      <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm bg-[#E3D5CA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl sm:p-6 p-5 transition-colors duration-300">

          <form onSubmit={handleLogin} className="space-y-5">
            <h5 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
              Log in to your account
            </h5>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box"

                // className="bg-[#EDEDE9] border border-gray-300 text-gray-900 text-sm rounded-lg 
                //            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                //            dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <PasswordInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Remember me + Forgot Password */}
            <div className="flex items-center justify-between">
             
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-[#8C7E73] hover:bg-[#8C7E80] 
                         focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                         transition duration-200 ease-in-out"
            >
              {loading ? "Logging in..." : "Login to your account"}
            </button>

            {/* Register link */}
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
              Not registered?{" "}
              <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  )

}
export default Login