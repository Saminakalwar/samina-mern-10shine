import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import { validateEmail } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
// import Signup from './Signup';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

     const navigate = useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();
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
  navigate('/dashboard');

        
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

          <button type="submit" className="btn-primary">Login</button>
        
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


