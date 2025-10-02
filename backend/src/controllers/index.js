// ==========================================
// backend/src/controllers/index.js
// ==========================================
const authController = require("./authController");
const taskController = require("./taskController");

module.exports = {
  authController,
  taskController,
};
