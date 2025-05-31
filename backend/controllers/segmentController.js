const Segment = require("../models/segment");
const Customer = require("../models/customer");
const { generateLabel } = require("../utils/generateLabel");
const {
  buildMongoQuery,
  aggregatedQueryPipeline,
} = require("../utils/CustomQuery");
const Campaign = require("../models/campaign");
const { sendMessage } = require("../config/kafkaProducer");

// Create a new segment
exports.createSegment = async (req, res) => {
  try {
    let { objective, description, rules, messageTemplate } = req.body;
    rules = JSON.stringify(rules);
    if (!objective || !description || !rules || !messageTemplate) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let newsegment = await Segment.create({
      objective,
      description,
      rules,
      userId: req.user._id,
    });
    let label = await generateLabel(
      objective,
      description,
      rules,
      messageTemplate
    );

    initiateCampaign(newsegment._id, messageTemplate, label);
    res.status(201).json({
      message: "Segment created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

initiateCampaign = async (segmentId, messageTemplate, label) => {
  try {
    let segment = await Segment.findById(segmentId);
    const { rules } = segment;
    let pipeline = [];
    const parsedRules = typeof rules === "string" ? JSON.parse(rules) : rules;
    if (!parsedRules || parsedRules.rules.length === 0) {
      pipeline = [
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "customerId",
            as: "orders",
          },
        },
      ];
    } else {
      const convertedQuery = buildMongoQuery(parsedRules);
      pipeline = aggregatedQueryPipeline(convertedQuery);
    }

    const customers = await Customer.aggregate(pipeline).count("count");
    const totalAudienceSize = customers[0].count;
    const campaign = new Campaign({
      segmentId,
      name: label,
      messageTemplate,
      totalAudienceSize,
    });
    await campaign.save();
    const KAFKA_TOPIC_CAMPAIGN_TRIGGER = "campaign-trigger";
    await sendMessage(KAFKA_TOPIC_CAMPAIGN_TRIGGER, {
      campaignId: campaign._id.toString(),
      customerFetchPipeline: pipeline,
      messageTemplate,
    });
    console.log("Campaign initiated successfully:", campaign._id);
  } catch (error) {
    console.error("Error initiating campaign:", error);
  }
};
