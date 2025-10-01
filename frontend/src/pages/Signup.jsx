import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import PasswordInput from '../components/PasswordInput';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }
     if (!email) {
      setError("Please enter your email");
      return;
    }
     if (!password) {
      setError("Please enter your password");
      return;
    }

    if (!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
    }

    setError(null);
    // later: call AuthContext.register here
    //SignUp API call
    navigate('/dashboard');
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            required
            autoComplete="username"
          />
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

            <PasswordInput id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  autoComplete="new-password" />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn-primary"
          >
            Sign Up
          </button>
        <p className="mt-6 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        </form>


      </div>
    </div>
    </>
  );
};

export default Signup;
