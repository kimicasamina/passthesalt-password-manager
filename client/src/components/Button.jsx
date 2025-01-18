import React from "react";

const Button = ({ disabled, label, onClick, loading, type = "button" }) => {
  const defaultStyles = `w-full px-4 py-2 rounded-lg focus:outline-none ${
    disabled
      ? "bg-secondary cursor-not-allowed"
      : loading
      ? "bg-secondary cursor-wait"
      : "bg-primary hover:bg-secondary"
  } text-darkText`;

  return (
    <button
      type={type}
      onClick={onClick}
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
