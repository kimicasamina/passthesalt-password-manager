import React from "react";
import Modal from "../../components/Modal";
import PasswordService from "../../services/passwordService";
import NoteService from "../../services/noteService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteLogin, deleteNote } from "../../store/slice/userSlice";

export default function DeleteItem({ close, itemId, itemType }) {
  const dispatch = useDispatch();

  const onDelete = async () => {
    try {
      if (itemType == "login") {
        console.log("DELETE LOGIN");
        const data = await PasswordService.deletePassword(itemId);
        toast.success("Sucessfully deleted an item.");
        dispatch(deleteLogin(itemId));
        close();
      } else {
        console.log("DELETE NOTE");
        const data = await NoteService.deleteNote(itemId);
        dispatch(deleteNote(itemId));
        toast.success("Sucessfully deleted an item.");
        close();
      }
    } catch (error) {
      console.log("ERR: ", error);
      toast.error("Failed to delete an item.");
    }
  };

  return (
    <Modal onClose={close}>
      <div className="w-full h-full flex items-center justify-center flex-col ">
        <p className="text-error font-bold text-lg text-wrap w-[220px] text-center  ">
          Are you sure you want to delete this item?
        </p>

        <div className="w-full flex justify-center gap-x-4 mt-8">
          <button
            className="bg-primary hover:bg-secondary px-8 py-2 rounded-md text-darkText"
            onClick={() => onDelete()}
          >
            Yes
          </button>

          <button
            className="bg-primary hover:bg-secondary px-8 py-2 rounded-md text-darkText"
            onClick={close}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
