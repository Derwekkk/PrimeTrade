import { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import AlertMessage from "../../molecules/AlertMessage/AlertMessage";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = ({ onSubmit, onSwitchToRegister }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        await onSubmit(values);
      } catch (err) {
        setError(err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Welcome Back
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}
      >
        Sign in to your account
      </Typography>

      {error && (
        <AlertMessage
          severity="error"
          message={error}
          onClose={() => setError("")}
        />
      )}

      <Box component="form" onSubmit={formik.handleSubmit}>
        <FormField
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />

        <FormField
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        />

        <Button type="submit" fullWidth loading={loading} sx={{ mt: 2, mb: 2 }}>
          Sign In
        </Button>

        <Typography variant="body2" align="center">
          Don't have an account?{" "}
          <Link
            component="button"
            type="button"
            onClick={onSwitchToRegister}
            sx={{ cursor: "pointer" }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
