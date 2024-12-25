import React from "react";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

export default InputField;
