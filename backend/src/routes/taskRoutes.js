const express = require("express");
const taskController = require("../controllers/taskController");
const { taskValidation } = require("../middleware/validator");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskValidation, taskController.createTask);
router.put("/:id", taskValidation, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
