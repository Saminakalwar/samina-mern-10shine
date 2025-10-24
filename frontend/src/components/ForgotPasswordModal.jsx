import React, { useState } from "react";
import API from "../services/api";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Password reset link sent to your email!");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-50 transition-opacity animate-fadeIn"
    >
      <div className="bg-white shadow-xl rounded-2xl w-[420px] p-6 relative animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-5">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
