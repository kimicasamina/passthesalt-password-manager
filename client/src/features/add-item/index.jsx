import React, { useState, useRef, useEffect } from "react";
import DropDownMenu from "./dropdown-menu";
import useModalDialog from "../../hooks/useModalDialog";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../../components/Modal";
import AddItemForm from "./add-item-form";

export default function AddItem({}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { isOpen, close, open } = useModalDialog();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = (id) => {
    setSelectedMenu(id);
    toggleDropdown();
    open();
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div className="relative inline-block">
        <button
          className="bg-accent text-white p-2 rounded-md hover:bg-accent-dark focus:outline-none flex items-center gap-x-2"
          onClick={toggleDropdown}
        >
          <FaPlusCircle className="w-6 h-6" />
          <span className="">Add New</span>
        </button>
        {isDropdownOpen && (
          <DropDownMenu dropdownRef={dropdownRef} toggleModal={toggleModal} />
        )}
      </div>

      {isOpen && (
        <Modal onClose={close}>
          <h1 className="text-lg font-semibold mb-4">
            {selectedMenu === "logins"
              ? "Add New Logins"
              : selectedMenu === "secret_note"
              ? "Add New Secret Note"
              : "Add New Folder"}
          </h1>

          <AddItemForm selectedMenu={selectedMenu} onClose={close} />
          {/* {children} */}
        </Modal>
      )}
    </>
  );
}
