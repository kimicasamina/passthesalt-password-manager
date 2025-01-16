import React from "react";
import { FaRegTimesCircle } from "react-icons/fa";

export default function ModalDialog({ onClose, children }) {
  const modalContent = {
    password: "This is the Add Password modal.",
    secret_note: "This is the Add Secret Note modal.",
    folder: "This is the Add Folder modal.",
  };

  const closeModal = (e) => {
    // Close the modal if the backdrop is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
      onClick={closeModal} // Close modal if clicking outside of the modal content
    >
      <div className="z-50 w-full max-w-[90%] md:max-w-[500px] h-auto mx-auto relative bg-accent rounded-lg p-8 shadow-lg transition-transform transform scale-95 opacity-0 animate-fadeInUp">
        <button className="absolute right-8 top-8" onClick={onClose}>
          <FaRegTimesCircle className="w-7 h-7" />
        </button>
        {children}
      </div>
    </div>
  );
}
