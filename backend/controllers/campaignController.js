const CommunicationLog = require("./../models/communicationLog");
const { sendMessage } = require("./../config/kafkaProducer");
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
