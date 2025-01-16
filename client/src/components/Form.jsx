import React, { useMemo, useState, useCallback } from "react";
import InputField from "./InputField"; // Assuming you have InputField component
import Button from "./Button"; // Assuming you have Button component
import useForm from "../hooks/useForm"; // Assuming you have useForm hook
import ValidationRules from "../utils/validationRules"; // Assuming validation rules are centralized
import PasswordService from "../services/passwordService";
import NoteService from "../services/noteService";
import FolderService from "../services/folderService";
import SelectInput from "./SelectInput"; // Assuming SelectInput is a reusable component
import useFetchFolders from "../features/dashboard/hooks/folders/useFetchFolders";

const Form = ({ selectedMenu, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { folders } = useFetchFolders();

  // Ensure folders is always an array, fallback to an empty array if undefined
  const safeFolders = Array.isArray(folders) ? folders : [];

  // Define field configuration dynamically based on selectedMenu
  const getFieldConfig = useCallback(() => {
    const commonFolderFields = [
      {
        name: "folder",
        label: "Folder",
        type: "select",
        options: safeFolders.map((folder) => ({
          value: folder.id,
          label: folder.name,
        })),
      },
    ];

    const fieldConfigs = {
      password: [
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" },
        { name: "website", label: "Website", type: "url" },
        ...commonFolderFields,
      ],
      secret_note: [
        { name: "name", label: "Title", type: "text" },
        { name: "content", label: "Content", type: "text" },
        ...commonFolderFields,
      ],
      folder: [
        { name: "name", label: "Folder Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
      ],
    };

    return fieldConfigs[selectedMenu] || [];
  }, [safeFolders, selectedMenu]);

  const initialValues = useMemo(() => {
    const values = {};
    getFieldConfig().forEach((field) => {
      values[field.name] = "";
    });
    return values;
  }, [getFieldConfig]);

  const validate = useMemo(() => {
    switch (selectedMenu) {
      case "password":
        return ValidationRules.validatePassword;
      case "secret_note":
        return ValidationRules.validateSecretNote;
      case "folder":
        return ValidationRules.validateFolder;
      default:
        return () => {};
    }
  }, [selectedMenu]);

  // Post request function for different menus
  const postRequest = async (values) => {
    try {
      setLoading(true);
      setError(null); // Reset previous errors

      let data;
      switch (selectedMenu) {
        case "password":
          data = await PasswordService.addNewPassword(
            values.name,
            values.username,
            values.email,
            values.password,
            values.website,
            values.favorites,
            values.folder_id
          );
          break;
        case "secret_note":
          data = await NoteService.addNewNote(values.name, values.content);
          break;
        case "folder":
          data = await FolderService.addNewFolder(
            values.name,
            values.description
          );
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
  } = useForm(initialValues, validate, postRequest);

  const renderInputs = () => {
    return getFieldConfig().map((field) => {
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

export default Form;
