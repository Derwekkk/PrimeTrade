const express = require("express");
const authRoutes = require("./authRoutes");
const taskRoutes = require("./taskRoutes");
const { apiLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.use(apiLimiter);
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
