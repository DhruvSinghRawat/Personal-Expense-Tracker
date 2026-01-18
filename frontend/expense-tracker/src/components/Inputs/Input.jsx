import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

/**
 * Reusable input component
 * - Supports normal inputs and password visibility toggle
 */
const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * Toggles password visibility
   */
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        <input
          type={
            type === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
        />

        {/* Password visibility toggle */}
        {type === 'password' && (
          showPassword ? (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
