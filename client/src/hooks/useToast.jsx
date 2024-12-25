// useToast.js
import { useContext } from "react";
import { ToastContext } from "./ToastContext";

const useToast = () => {
  const { addToast } = useContext(ToastContext);

  const showToast = (message, type = "success") => {
    addToast(message, type);
  };

  return showToast;
};

export default useToast;
