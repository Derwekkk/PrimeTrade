const authService = require("../services/authService");
const { sendSuccess, sendError } = require("../utils/responseUtils");

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    sendSuccess(res, 201, "User registered successfully", result);
  } catch (error) {
    sendError(res, error, 400);
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    sendSuccess(res, 200, "Login successful", result);
  } catch (error) {
    sendError(res, error, 401);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    sendSuccess(res, 200, "Profile retrieved successfully", { user });
  } catch (error) {
    sendError(res, error);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);
    sendSuccess(res, 200, "Profile updated successfully", { user });
  } catch (error) {
    sendError(res, error, 400);
  }
};
