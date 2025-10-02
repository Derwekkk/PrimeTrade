import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import AlertMessage from "../../molecules/AlertMessage/AlertMessage";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .required("Title is required"),
  description: Yup.string().max(
    500,
    "Description must not exceed 500 characters"
  ),
  status: Yup.string()
    .oneOf(["pending", "in-progress", "completed"])
    .required("Status is required"),
  priority: Yup.string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
  dueDate: Yup.date().nullable(),
});

const TaskForm = ({ open, onClose, onSubmit, initialValues = null }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEditMode = !!initialValues;

  const formik = useFormik({
    initialValues: initialValues || {
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      dueDate: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        await onSubmit(values);
        formik.resetForm();
        onClose();
      } catch (err) {
        setError(err.message || "Failed to save task");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Edit Task" : "Create New Task"}</DialogTitle>

      <DialogContent>
        {error && (
          <AlertMessage
            severity="error"
            message={error}
            onClose={() => setError("")}
          />
        )}

        <Box
          component="form"
          id="task-form"
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <FormField
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && formik.errors.title}
            required
          />

          <FormField
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
          />

          <FormField
            name="status"
            label="Status"
            select
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && formik.errors.status}
            required
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </FormField>

          <FormField
            name="priority"
            label="Priority"
            select
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.priority && formik.errors.priority}
            required
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </FormField>

          <FormField
            name="dueDate"
            label="Due Date"
            type="date"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dueDate && formik.errors.dueDate}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" form="task-form" loading={loading}>
          {isEditMode ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
