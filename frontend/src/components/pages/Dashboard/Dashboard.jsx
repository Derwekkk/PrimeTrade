import { useState, useEffect } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout/DashboardLayout";
import TaskFilters from "../../organisms/TaskFilters/TaskFilters";
import TaskList from "../../organisms/TaskList/TaskList";
import TaskForm from "../../organisms/TaskForm/TaskForm";
import { taskService } from "../../../services/api/taskService";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 1,
    limit: 10,
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
  });

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search, filters.status, filters.priority, pagination.page]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.search && { search: filters.search }),
        ...(filters.status !== "all" && { status: filters.status }),
        ...(filters.priority !== "all" && { priority: filters.priority }),
      };

      const response = await taskService.getTasks(params);
      console.log("Tasks response:", response);

      // Handle the response structure from backend
      const tasksData = response.data.data || response.data;

      setTasks(tasksData.tasks || []);
      setPagination(
        tasksData.pagination || { page: 1, total: 0, pages: 1, limit: 10 }
      );
    } catch (error) {
      console.error("Failed to load tasks:", error);
      // Set empty state on error
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      loadTasks();
    } catch (error) {
      console.error("Failed to save task:", error);
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.deleteTask(taskId);
        loadTasks();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
  };

  return (
    <DashboardLayout user={user} onLogout={logout}>
      <Box>
        <Typography variant="h4" gutterBottom>
          My Tasks
        </Typography>

        <TaskFilters
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onAddTask={handleAddTask}
          filters={filters}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        {pagination.pages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={pagination.pages}
              page={pagination.page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}

        <TaskForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmitTask}
          initialValues={editingTask}
        />
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
