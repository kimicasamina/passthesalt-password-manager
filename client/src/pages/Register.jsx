import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ValidationRules from "../utils/validationRules";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for registration

  // Handle form submission
  const onSubmit = async (values) => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      // Call the registerService to send a POST request
      const data = await AuthService.register(
        values.username,
        values.email,
        values.password
      );
      console.log("Registration successful:", data.msg);

      // Redirect to login page or dashboard upon success
      toast.success(data.msg);
      navigate("/"); // Redirect to login page or dashboard
    } catch (err) {
      console.log("Registration failed:", err);
      setError(err); // Set error message if the registration fails
      toast.error("Unable to register new user.");
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
    ValidationRules.validateRegister,
    onSubmit
  );

  return (
    <div className="w-full max-w-[50%] mx-auto flex flex-col gap-y-8 py-14 px-8 mt-10 rounded-md border bg-darkBackground text-darkText">
      <h2 className="text-center text-2xl font-semibold ">Register</h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <InputField
          label="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
          customClass={"border"}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          customClass={"border"}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          customClass={"border"}
        />
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          customClass={"border"}
        />

        {/* Display registration error message if any */}
        {!isSubmitting && error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

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
