const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

// Public routes
router.post("/google", authController.googleAuth);

// Protected routes (require authentication)
router.get("/me", authMiddleware.protect, authController.getMe);
router.post("/logout", authMiddleware.protect, authController.logout);

module.exports = router;
