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
  customClass,
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
      className={`w-full px-3 py-2 border shadow-md outline-none rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-secondary ${
        error ? "border-red-500" : "border-gray-300"
      } ${customClass}`}
    />
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

export default InputField;
