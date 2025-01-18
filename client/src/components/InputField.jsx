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
      className={`w-full px-3 py-2 border outline-none rounded-lg focus:outline-none text-lightText focus:ring-2 focus:ring-secondary ${
        error ? "border-error" : "border-borderDark"
      } ${customClass}`}
    />
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

export default InputField;
