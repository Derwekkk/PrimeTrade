const taskService = require("../services/taskService");
const { sendSuccess, sendError } = require("../utils/responseUtils");

exports.getTasks = async (req, res) => {
  try {
    const result = await taskService.getTasks(req.user.id, req.query);
    sendSuccess(res, 200, "Tasks retrieved successfully", result);
  } catch (error) {
    sendError(res, error);
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await taskService.getTask(req.params.id, req.user.id);
    sendSuccess(res, 200, "Task retrieved successfully", { task });
  } catch (error) {
    sendError(res, error, 404);
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);
    sendSuccess(res, 201, "Task created successfully", { task });
  } catch (error) {
    sendError(res, error, 400);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user.id,
      req.body
    );
    sendSuccess(res, 200, "Task updated successfully", { task });
  } catch (error) {
    sendError(res, error, 400);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    sendSuccess(res, 200, "Task deleted successfully");
  } catch (error) {
    sendError(res, error, 404);
  }
};
