import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ValidationRules from "../utils/validationRules";
import useForm from "../hooks/useForm";
import Button from "../components/Button";
import InputField from "../components/InputField";
import AuthService from "../services/authService";
import toast from "react-hot-toast";
import { login } from "../store/slice/authSlice";
import { setInitialData } from "../store/slice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect to home page if the user is already logged in
  useEffect(() => {
    if (user && user.username) {
      navigate("/"); // Navigate to home if already logged in
    }
  }, [user, navigate]);

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const data = await AuthService.loginUser(values.email, values.password);
      // Save token to localStorage
      console.log("RESPONSE:", data);
      const user = {
        user: data.user,
        ...data.user,
      };
      dispatch(setInitialData(user)); // Set the initial data in the store
      toast.success(`Welcome, ${data.user.username}.`);
      navigate("/"); // Navigate to the home page after successful login
    } catch (error) {
      toast.error(error.message || "Failed to log in.");
      setLoading(false); // Stop loading if there's an error
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
    ValidationRules.validateLogin,
    onSubmit
  );

  return (
    <div className="w-full max-w-[50%] mx-auto flex flex-col gap-y-8 py-14 px-8 mt-10 rounded-md border bg-darkBackground text-darkText">
      <h2 className="text-center text-2xl font-semibold">Login</h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
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

        {!isSubmitting && error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}

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
