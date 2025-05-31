const router = require("express").Router();
const campaignController = require("../controllers/campaignController");

router.post("/delivery-receipt", campaignController.deliveryReceiptHandler);

module.exports = router;
