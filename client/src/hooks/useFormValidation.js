import { useState } from "react";

export function useFormValidation(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Handle when input fields are blurred (lost focus)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validate({ [name]: value }); // Validate only the blurred field
    setErrors({
      ...errors,
      [name]: error[name], // Only set error for the specific field
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);

    // Return false if there are errors, otherwise true
    return Object.keys(validationErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
