// components/common/Form.jsx
import React, { useMemo } from "react";
import InputField from "./InputField"; // Assuming you have InputField component
import Button from "./Button"; // Assuming you have Button component
import useForm from "../../hooks/useForm"; // Assuming you have useForm hook
import ValidationRules from "../../utils/validationRules"; // Assuming validation rules are centralized

const Form = ({ selectedMenu, onSubmit }) => {
  // Define form field configuration for each menu
  const fieldConfig = useMemo(() => {
    const configs = {
      password: [
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "username", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" },
        { name: "website", label: "Website", type: "url" },
      ],
      secret_note: [
        { name: "title", label: "Title", type: "text" },
        { name: "content", label: "Content", type: "text" },
      ],
      folder: [
        { name: "name", label: "Folder Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
        { name: "color", label: "Color", type: "text" },
      ],
    };

    return configs[selectedMenu] || [];
  }, [selectedMenu]);

  // Define initial values based on selectedMenu
  const initialValues = useMemo(() => {
    const values = {};
    fieldConfig.forEach((field) => {
      values[field.name] = "";
    });
    return values;
  }, [fieldConfig]);

  // Define validation rules based on selectedMenu
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

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm(initialValues, validate, onSubmit);

  // Helper function to render input fields dynamically
  const renderInputs = () => {
    return fieldConfig.map((field) => (
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
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderInputs()}
      <Button
        label="Submit"
        type="submit"
        disabled={Object.keys(errors).length > 0 || isSubmitting}
      />
    </form>
  );
};

export default Form;
