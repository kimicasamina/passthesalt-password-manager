import React, { useState, useMemo, useRef, useEffect } from "react";
import { FaKey, FaPlusCircle, FaRegStickyNote, FaFolder } from "react-icons/fa";
import userModalDialog from "../../hooks/useModalDialog";
import ModalDialog from "../ModalDialog";
import Form from "../Form";

export default function NewItem() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { isOpen, open, close } = userModalDialog();

  // Menu list definition
  const menuList = useMemo(
    () => [
      {
        id: "password",
        label: "Add Password",
        icon: <FaKey className="w-4 h-4" />,
      },
      {
        id: "secret_note",
        label: "Add Secret Note",
        icon: <FaRegStickyNote className="w-4 h-4" />,
      },
      {
        id: "folder",
        label: "Add Folder",
        icon: <FaFolder className="w-4 h-4" />,
      },
    ],
    []
  );

  const dropdownRef = useRef(null);

  // const handleSubmit = (values) => {
  //   const onSubmit = async (values) => {
  //     setLoading(true);
  //     setError(null); // Reset previous errors
  //     try {
  //       const data = await AuthService.login(values.email, values.password);
  //       login(data.user);
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // };

  // const onSubmit = async (values) => {
  //   setLoading(true);
  //   setError(null); // Reset previous errors
  //   try {
  //     const data = await AuthService.login(values.email, values.password);
  //     login(data.user);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }

  //   // Handle form submission based on selectedMenu
  //   console.log("Form Submitted:", values);
  //   close(); // Close modal after submission
  // };

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleModal = (id) => {
    setSelectedMenu(id);
    toggleDropdown();
    open();
  };

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

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute bg-gray-800 text-white rounded-md shadow-md mt-2 w-48"
          >
            {menuList.map((menu) => (
              <button
                key={menu.id}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none flex gap-x-2 items-center rounded-md"
                onClick={() => toggleModal(menu.id)}
              >
                <span>{menu.icon}</span>
                <span>{menu.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {isOpen && (
        <ModalDialog onClose={close}>
          <h1 className="text-lg font-semibold mb-4">
            {selectedMenu === "password"
              ? "Add New Password"
              : selectedMenu === "secret_note"
              ? "Add New Secret Note"
              : "Add New Folder"}
          </h1>
          <Form selectedMenu={selectedMenu} onClose={onClose} />
        </ModalDialog>
      )}
    </>
  );
}
