import React from "react";

const Button = ({ disabled, label, onClick, loading, type = "button" }) => {
  const defaultStyles = `w-full px-4 py-2 rounded-lg focus:outline-none ${
    disabled
      ? "bg-gray-400 cursor-not-allowed"
      : loading
      ? "bg-blue-500 cursor-wait"
      : "bg-blue-600 hover:bg-blue-700"
  } text-white`;

  return (
    <button
      type={type}
      onClick={onClick ? onClick : null}
      disabled={disabled || loading}
      className={defaultStyles}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-4 border-t-transparent border-blue-300 border-solid rounded-full animate-spin"></div>
          <span className="text-sm ml-2">Loading...</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
