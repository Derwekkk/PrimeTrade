import { Box } from "@mui/material";
import Input from "../../atoms/Input/Input";

const FormField = ({ label, error, required = false, ...props }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Input label={label} error={error} required={required} {...props} />
    </Box>
  );
};

export default FormField;
