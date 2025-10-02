import { Alert, AlertTitle, Collapse } from "@mui/material";

const AlertMessage = ({
  open = true,
  severity = "info",
  title,
  message,
  onClose,
}) => {
  return (
    <Collapse in={open}>
      <Alert severity={severity} onClose={onClose} sx={{ mb: 2 }}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Collapse>
  );
};

export default AlertMessage;
