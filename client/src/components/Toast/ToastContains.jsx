// ToastContainer.js
import React, { useState } from "react";
import Toast from "./Toast";

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
