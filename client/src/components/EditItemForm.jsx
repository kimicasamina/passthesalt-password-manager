import React, { useMemo, useState, useCallback } from "react";
import InputField from "./InputField";
import Button from "./Button";
import useForm from "../hooks/useForm";
import ValidationRules from "../utils/validationRules";
import PasswordService from "../services/passwordService";
import NoteService from "../services/noteService";
import SelectInput from "./SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { editLogin, editNote } from "../store/slice/userSlice";

const EditItemForm = ({ type, item, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { folders } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("INTIIAL VALUES...", item);

  // Ensure folders is always an array, fallback to an empty array if undefined
  const safeFolders = Array.isArray(folders) ? folders : [];

  // Define field configuration dynamically based on selectedMenu
  const getFieldConfig = useCallback(() => {
    const commonFolderFields = [
      {
        name: "folder_id",
        label: "Folder",
        type: "select",
        options: safeFolders.map((folder) => ({
          value: folder.id, // Ensure folder has 'id' and 'name'
          label: folder.name,
        })),
      },
    ];

    const fieldConfigs = {
      login: [
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "text" },
        { name: "website", label: "Website", type: "text" },
        ...commonFolderFields,
      ],
      secret_note: [
        { name: "name", label: "Title", type: "text" },
        { name: "content", label: "Content", type: "text" },
        ...commonFolderFields,
      ],
    };

    return fieldConfigs[type] || [];
  }, [safeFolders, type]);

  // Set initialValues based on the `item` prop to pre-fill the form
  const initialValues = useMemo(() => {
    const values = {};
    item;

    // Use item values to pre-fill the form fields
    getFieldConfig().forEach((field) => {
      if (item && item[field.name] !== undefined) {
        values[field.name] = item[field.name]; // Set the value from the item prop
      } else {
        values[field.name] = ""; // Default empty value
      }
    });

    return values;
  }, [getFieldConfig, item]);

  const validate = useMemo(() => {
    switch (type) {
      case "login":
        return ValidationRules.validatePassword;
      case "secret_note":
        return ValidationRules.validateSecretNote;
      default:
        return () => {};
    }
  }, [type]);

  // Post request function for different menus
  const putRequest = async (values) => {
    try {
      setLoading(true);
      setError(null); // Reset previous errors

      let data;
      switch (type) {
        case "login":
          data = await PasswordService.updatePassword(
            item.id,
            values.name,
            values.username,
            values.email,
            values.password,
            values.website,
            values.folder_id
          );
          dispatch(editLogin(data.login));
          break;
        case "secret_note":
          data = await NoteService.updateNote(
            item.id,
            values.name,
            values.content,
            values.folder_id
          );
          dispatch(editNote(data.note));
          break;
        default:
          throw new Error("Invalid menu selected");
      }

      console.log("DATA RESULTS: ", data);

      onClose(); // Close the form after success
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // End the loading state
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm(initialValues || {}, validate, putRequest);

  const renderInputs = () => {
    const fieldConfig = getFieldConfig();
    if (!Array.isArray(fieldConfig)) {
      console.error(
        "Invalid field configuration returned from getFieldConfig:",
        fieldConfig
      );
      return []; // Or an empty array to prevent the error
    }
    return fieldConfig.map((field) => {
      if (!field || !field.name) {
        console.error("Field is missing 'name' property:", field);
        return null;
      }

      if (field.type === "select") {
        return (
          <SelectInput
            key={field.name}
            label={field.label}
            name={field.name}
            value={values[field.name]}
            onChange={handleChange}
            options={field.options}
            error={errors[field.name]}
          />
        );
      } else {
        return (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[field.name]}
          />
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderInputs()}

      {!isSubmitting && error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      <Button
        label={loading ? "Loading..." : "Submit"}
        loading={loading}
        disabled={isSubmitting || Object.keys(errors).length > 0}
        type="submit"
      />
    </form>
  );
};

export default EditItemForm;
