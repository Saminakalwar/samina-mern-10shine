import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PasswordInput = ({ id, name, value, onChange, placeholder, autoComplete}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        type={showPassword ? "text" : "password"}
        className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
        required
        autoComplete={autoComplete}
      />
      <span
        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <FaRegEye size={22} className="text-primary" />
        ) : (
          <FaRegEyeSlash size={22} className="text-slate-400" />
        )}
      </span>
    </div>
  );
};

export default PasswordInput;
