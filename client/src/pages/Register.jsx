import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { validateRegister } from "../utils/validationRules";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/authService";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for registration

  // Handle form submission
  const onSubmit = async (values) => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      // Call the registerService to send a POST request
      const data = await registerService(
        values.username,
        values.email,
        values.password
      );
      console.log("Registration successful:", data);

      // Redirect to login page or dashboard upon success
      navigate("/login"); // Redirect to login page or dashboard
    } catch (err) {
      console.log("Registration failed:", err);
      setError(err); // Set error message if the registration fails
    } finally {
      setLoading(false); // Reset loading state after request
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm(
    { username: "", email: "", password: "", confirmPassword: "" },
    validateRegister,
    onSubmit
  );

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
        />

        {/* Display registration error message if any */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <Button
          label={loading ? "Creating new user..." : "Register"}
          loading={loading}
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
        />
      </form>
    </div>
  );
};

export default Register;
