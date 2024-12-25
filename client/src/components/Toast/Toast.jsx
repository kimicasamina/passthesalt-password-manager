// Toast.js
import React, { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const toastClass =
    type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white";

  return (
    <div
      className={`flex items-center p-4 mb-4 rounded-md shadow-lg ${toastClass}`}
    >
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        className="ml-4 text-lg font-semibold text-white"
      >
        ✖
      </button>
    </div>
  );
};

export default Toast;
