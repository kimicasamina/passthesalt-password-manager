import { useState, useEffect } from "react";

// Custom Hook for Form Handling with validation
const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change and validate on the fly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Validate the field while typing
    const fieldErrors = validate({ ...values, [name]: value });
    setErrors(fieldErrors);
  };

  // Handle blur for validating all fields at once
  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      onSubmit(values);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      setErrors({});
    }
  }, [isSubmitting]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

export default useForm;
