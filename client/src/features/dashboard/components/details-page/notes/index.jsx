import React, { useState } from "react";
import FormattedDate from "../../../../../components/FormattedDate";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Modal from "../../../../../components/Modal";
import EditItemForm from "../../../../../components/EditItemForm";
import useModalDialog from "../../../../../hooks/useModalDialog";
import DeleteItem from "../../../../delete-item";

export default function Notes({ selectedItem }) {
  const { isOpen, open, close } = useModalDialog();
  const [actionType, setActionType] = useState(null);

  console.log("SELECTED: ", selectedItem);

  const handleOpenEditModal = () => {
    open();
    setActionType("edit");
  };

  const handleOpenDeleteModal = () => {
    open();
    setActionType("delete");
  };

  return (
    <div className="h-full w-full flex flex-col bg-lightBackground text-lightText gap-y-6">
      <h2 className="text-2xl font-bold ">{selectedItem?.name}</h2>
      <p className="text-base">{selectedItem?.content}</p>

      <div className="flex flex-col gap-y-2 mt-20">
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-semibold text-primary">Created</span>
          <FormattedDate date={selectedItem?.createdAt} />
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-xs font-semibold text-primary">Updated</span>
          <FormattedDate date={selectedItem?.updatedAt} />
        </div>
      </div>

      <div className="w-full flex gap-x-4 justify-end mt-auto">
        <button
          className="flex gap-x-2 items-center px-4 py-2 rounded-sm bg-primary text-darkText hover:bg-secondary text-sm hover:text-lightText"
          onClick={handleOpenEditModal}
        >
          <FaRegEdit className="w-4 h-4" />
          <span className="">Edit</span>
        </button>
        <button
          className="flex gap-x-2 items-center px-4 py-2 rounded-sm bg-primary text-darkText hover:bg-secondary text-sm hover:text-lightText"
          onClick={handleOpenDeleteModal}
        >
          <FaTrash className="w-4 h-4" />
          <span className="">Delete</span>
        </button>
      </div>

      {isOpen && actionType == "edit" ? (
        <Modal onClose={close}>
          <EditItemForm
            type={"secret_note"}
            item={selectedItem}
            onClose={close}
          />
        </Modal>
      ) : null}

      {isOpen && actionType == "delete" ? (
        // <Modal onClose={close}>
        //   <EditItemForm
        //     type={"secret_note"}
        //     item={selectedItem}
        //     onClose={close}
        //   />
        // </Modal>
        <DeleteItem close={close} itemId={selectedItem.id} itemType={"note"} />
      ) : null}
    </div>
  );
}
