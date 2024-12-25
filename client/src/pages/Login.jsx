import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormValidation } from "../hooks/useFormValidation";
import { validateLogin } from "../utils/validationRules";
import useForm from "../hooks/useForm";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { loginService } from "../services/authService";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      // Handle user login logic
      console.log("Logging in user:", values);
      // Call your login service here
    } catch (error) {
      console.log("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useForm({ email: "", password: "" }, validateLogin, onSubmit);

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <Button
          label={loading ? "Logging in..." : "Login"}
          loading={loading}
          disabled={isSubmitting || Object.keys(errors).length > 0}
        />
      </form>
    </div>
  );
};

export default Login;
