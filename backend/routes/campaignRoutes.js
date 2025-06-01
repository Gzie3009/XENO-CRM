const router = require("express").Router();
const campaignController = require("../controllers/campaignController");
const authMiddleware = require("../middlewares/auth");

router.post("/delivery-receipt", campaignController.deliveryReceiptHandler);
router.get("/", authMiddleware.protect, campaignController.getAllCampaigns);
router.get("/:id", authMiddleware.protect, campaignController.getCampaignById);

module.exports = router;
