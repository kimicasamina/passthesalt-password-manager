import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormValidation } from "../hooks/useFormValidation";
import { validateLogin } from "../utils/validationRules";
import useForm from "../hooks/useForm";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import AuthService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await AuthService.login(values.email, values.password);
      login(data.user);
      navigate("/"); // Redirect to homepage after login success
    } catch (error) {
      console.error("Login failed:", error);
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
  } = useForm(
    {
      email: "",
      password: "",
    },
    validateLogin,
    onSubmit
  );

  useEffect(() => {
    if (user) {
      navigate("/"); // If the user is already logged in, redirect to home
    }
  }, [user, navigate]);

  return (
    <div className="w-full max-w-[50%] mx-auto flex flex-col gap-y-4 p-8 mt-10 rounded-md border shadow-mild bg-cardBackground">
      <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
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
          type="submit"
        />
      </form>
    </div>
  );
};

export default Login;
