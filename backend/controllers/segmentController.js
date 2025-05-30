const Segment = require("../models/segment");
const Customer = require("../models/customer");
const { generateLabel } = require("../utils/generateLabel");
const {
  buildMongoQuery,
  aggregatedQueryPipeline,
} = require("../utils/CustomQuery");

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

    let campaign = { _id: 1 };
    // initiate the campaign
    // initiateCampaign(segment._id,messageTemplate,label)

    // dummy return for now
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSegments = async (req, res) => {
  try {
    let segments = await Segment.find();
    if (segments.length >= 0) {
      if (segments.length == 0) {
        segments = [];
      }
      return res.status(200).json(segments);
    }
    res.status(404).json({ message: "Segment not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
