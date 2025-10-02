const express = require("express");
const authController = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validator");
const { protect } = require("../middleware/authMiddleware");
// const { authLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);

module.exports = router;
