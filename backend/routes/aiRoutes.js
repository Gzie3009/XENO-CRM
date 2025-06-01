const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const aiController = require("../controllers/aiController");
router.use(authMiddleware.protect);

router.post("/generate-templates", aiController.generateTemplates);
router.post("/generate-rules", aiController.generateRulesFromNaturalLanguage);

module.exports = router;
