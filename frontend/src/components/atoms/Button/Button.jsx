import { Button as MuiButton, CircularProgress } from "@mui/material";

const Button = ({
  children,
  loading = false,
  variant = "contained",
  color = "primary",
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </MuiButton>
  );
};

export default Button;
