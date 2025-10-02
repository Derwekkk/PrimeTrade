import { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import AlertMessage from "../../molecules/AlertMessage/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterForm = ({ onSubmit, onSwitchToLogin }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        await onSubmit(values);
      } catch (err) {
        setError(err.message || "Registration failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Create Account
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}
      >
        Start your journey with us
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
          name="name"
          label="Full Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
        />

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

        <FormField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />

        <Button type="submit" fullWidth loading={loading} sx={{ mt: 2, mb: 2 }}>
          Create Account
        </Button>

        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link
            component="button"
            type="button"
            onClick={onSwitchToLogin}
            sx={{ cursor: "pointer" }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
