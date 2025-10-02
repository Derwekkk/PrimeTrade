import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    pending: "warning",
    "in-progress": "info",
    completed: "success",
  };

  const priorityColors = {
    low: "default",
    medium: "primary",
    high: "error",
  };

  return (
    <Card sx={{ mb: 2, "&:hover": { boxShadow: 3 } }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6" component="h3">
            {task.title}
          </Typography>
          <Box>
            <Chip
              label={task.status}
              color={statusColors[task.status]}
              size="small"
              sx={{ mr: 1 }}
            />
            <Chip
              label={task.priority}
              color={priorityColors[task.priority]}
              size="small"
            />
          </Box>
        </Box>

        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {task.description}
          </Typography>
        )}

        {task.dueDate && (
          <Typography variant="caption" color="text.secondary">
            Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton size="small" color="primary" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(task._id)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
