import { Box, Typography, CircularProgress } from "@mui/material";
import TaskCard from "../../molecules/TaskCard/TaskCard";

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first task to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};

export default TaskList;
