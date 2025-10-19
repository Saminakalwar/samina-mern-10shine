import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import { validateEmail } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {login} = useAuth(); //custom hook
    const navigate = useNavigate(); // hook

    const handleLogin = async(e)=>{
        e.preventDefault(); //prevent the default behavior of form submission from reloading the page on user reclick

    if (!email) {
    setError("Please enter the email address.");
    return;
  }
    if (!password) {
    setError("Please enter the password.");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }
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
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
            autoComplete="email"
          />

          <PasswordInput id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value) }  autoComplete="current-password"
/>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
              type="submit"
              className="btn-primary w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
        
        <p className="mt-6 text-sm text-center">
          Not registered yet?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Create an Account
          </Link>
        </p>
        </form>


      </div>
    </div>
    </>
  )
}

export default Login



















//   try{
//     const res = await API.post('/auth/login', {email, password});
//     // handle successful login response
//     if(res.data && res.data.token){
//      const { token, user } = res.data;// from response data object it will only fetch the token & user
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     navigate('/dashboard');
//     }
//     else {
//         setError("Invalid login response.");
//       }
//   }
//   catch(error){
//     // handle Login Error
// // if (error.response && error.response.data && error.response.data.message) { //or
// if (error.response?.data?.message) {
//   setError(error.response.data.message);
// } else {
//   setError("An unexpected error occurred. Please try again.");
// }