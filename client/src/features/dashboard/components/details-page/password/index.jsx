import React, { useState, useEffect } from "react";
import PasswordDetails from "./password-details";
import FormattedDate from "../../../../../components/FormattedDate";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import useModalDialog from "../../../../../hooks/useModalDialog";
import toast from "react-hot-toast";
import useDecryptPassword from "../../../../../hooks/passwords/useDecryptPassword";
import DeleteItem from "../../../../delete-item";
import EditItem from "../../../../edit-item";

export default function Password({ selectedItem }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ iv: "", password: "" });
  const { isOpen, open, close } = useModalDialog();
  const [actionType, setActionType] = useState(null);
  const { getDecryptedPassword } = useDecryptPassword();
  const [initialValues, setInitialValues] = useState({});

  console.log("SELECTED ITEM", selectedItem);

  const handleOpenEditModal = async () => {
    try {
      const password = await getDecryptedPassword(
        selectedItem.iv,
        selectedItem.password
      );

      const values = {
        name: selectedItem.name,
        username: selectedItem.username,
        email: selectedItem.email,
        password: password,
        website: selectedItem.website || "",
        folder_id: selectedItem.folder_id || "", // Ensure folder_id exists
      };
      setInitialValues({ ...selectedItem, password: password });
      open();
      setActionType("edit");
    } catch (error) {
      console.log(error);
      toast.error("Failed to decrypt password");
    }
  };

  const handleOpenDeleteModal = () => {
    open();
    setActionType("delete");
  };

  useEffect(() => {
    if (selectedItem) {
      setPasswordData({
        iv: selectedItem.iv,
        password: selectedItem.password,
      });
    }
  }, [selectedItem]);

  console.log("SELECTED ITEM: ", selectedItem);

  if (!selectedItem || Object.keys(selectedItem).length === 0) {
    return <p>No item selected. Please select an item from the list.</p>;
  }

  return (
    <div className="h-full w-full flex flex-col bg-lightBackground text-lightText gap-y-6">
      <div className="w-full flex flex-col gap-y-2">
        <h3 className="text-xs font-semibold text-primary">Name</h3>
        <p className="text-sm">{selectedItem.name}</p>
      </div>

      <div className="w-full flex flex-col gap-y-2">
        <h3 className="text-xs font-semibold text-primary">Username</h3>
        <p className="text-sm">{selectedItem.username}</p>
      </div>

      <div className="w-full flex flex-col gap-y-2">
        <h3 className="text-xs font-semibold text-primary">Email</h3>
        <p className="text-sm">{selectedItem.email}</p>
      </div>
      <PasswordDetails passwordData={passwordData} />
      <div className="w-full flex flex-col gap-y-2">
        <h3 className="text-xs font-semibold text-primary">Website</h3>
        <p className="text-base">{selectedItem.website}</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-semibold text-primary">Created</span>
          <FormattedDate date={selectedItem.createdAt} />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-semibold text-primary">Updated</span>
          <FormattedDate date={selectedItem.updatedAt} />
        </div>
      </div>

      <div className="w-full flex gap-x-4 justify-end mt-auto">
        <button
          className="flex gap-x-2 items-center px-4 py-2 rounded-sm bg-primary text-darkText hover:bg-secondary text-xs hover:text-lightText"
          onClick={handleOpenEditModal}
        >
          <FaRegEdit className="w-4 h-4" />
          <span className="">Edit</span>
        </button>
        <button
          className="flex gap-x-2 items-center px-4 py-2 rounded-sm bg-primary text-darkText hover:bg-secondary text-xs hover:text-lightText"
          onClick={handleOpenDeleteModal}
        >
          <FaTrash className="w-4 h-4" />
          <span className="">Delete</span>
        </button>
      </div>

      {isOpen && actionType == "edit" ? (
        <EditItem type={"login"} item={initialValues} close={close} />
      ) : null}

      {isOpen && actionType == "delete" ? (
        <DeleteItem close={close} itemId={selectedItem.id} itemType={"login"} />
      ) : null}
    </div>
  );
}
