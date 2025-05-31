const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const segmentController = require("../controllers/segmentController");
router.use(authMiddleware.protect);

router.post("/", segmentController.createSegment);

module.exports = router;
