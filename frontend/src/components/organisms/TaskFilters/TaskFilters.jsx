import { Box, MenuItem, Grid } from "@mui/material";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import AddIcon from "@mui/icons-material/Add";

const TaskFilters = ({ onSearch, onFilterChange, onAddTask, filters }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <SearchBar onSearch={onSearch} placeholder="Search tasks..." />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormField
            name="status"
            label="Status"
            select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </FormField>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormField
            name="priority"
            label="Priority"
            select
            value={filters.priority}
            onChange={(e) => onFilterChange("priority", e.target.value)}
            size="small"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </FormField>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button onClick={onAddTask} startIcon={<AddIcon />}>
            Add Task
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskFilters;
