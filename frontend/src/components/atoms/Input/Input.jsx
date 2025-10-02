import { TextField } from "@mui/material";

const Input = ({ label, error, helperText, ...props }) => {
  return (
    <TextField
      label={label}
      error={!!error}
      helperText={error || helperText}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default Input;
