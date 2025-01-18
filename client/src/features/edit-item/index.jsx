import React from "react";
import Modal from "../../components/Modal";
import EditItemForm from "./edit-item-form";

export default function EditItem({ type, item, close }) {
  return (
    <Modal onClose={close}>
      <EditItemForm type={type} item={item} onClose={close} />
    </Modal>
  );
}
