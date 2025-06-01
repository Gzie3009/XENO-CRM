const CommunicationLog = require("./../models/communicationLog");
const Campaign = require("./../models/campaign");
const { sendMessage } = require("./../config/kafkaProducer");
const generateCampaignSummary = require("../utils/generateCampaignSummary");
exports.deliveryReceiptHandler = async (req, res) => {
  try {
    if (
      !req.headers["x-api-key"] ||
      req.headers["x-api-key"] !== process.env.VENDOR_API_KEY
    ) {
      return res.status(401).json({ message: "Unauthorized: Invalid API Key" });
    }
    const { communicationLogId, status } = req.body;
    if (!communicationLogId || !status) {
      return res.status(400).json({
        message: "Missing required fields: communicationLogId, status",
      });
    }
    const communicationLog = await CommunicationLog.findById(
      communicationLogId
    );
    if (!communicationLog) {
      return res.status(404).json({ message: "Communication Log not found" });
    }
    if (status !== "SENT" && status !== "FAILED") {
      return res.status(400).json({ message: "Invalid status value" });
    }
    // batch update the communication log
    const KAFKA_TOPIC_DELIVERY_RECEIPT = "campaign-delivery-receipt";
    await sendMessage(KAFKA_TOPIC_DELIVERY_RECEIPT, {
      communicationLogId,
      status,
      timestamp: new Date().toISOString(),
    });
    res.status(200).json({ message: "Delivery Receipt updated successfully" });
  } catch (error) {
    console.error("Error in deliveryReceiptHandler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllCampaigns = async (req, res) => {
  try {
    let campaigns = await Campaign.find()
      .sort({ initiatedAt: -1 })
      .populate("segmentId");
    if (campaigns.length === 0) {
      campaigns = [];
    }
    res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error in getAllCampaigns:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Campaign ID is required" });
    }
    const campaign = await Campaign.findById(id).populate("segmentId");
    if (!campaign || campaign.status === "INITIATED") {
      return res.status(404).json({ message: "Campaign not found" });
    }
    if (campaign.status === "COMPLETED" && !campaign.summary) {
      const summary = await generateCampaignSummary(campaign);
      console.log(summary);
      campaign.summary = summary;
      await campaign.save();
    }
    res.status(200).json(campaign);
  } catch (error) {
    console.error("Error in getCampaignById:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
