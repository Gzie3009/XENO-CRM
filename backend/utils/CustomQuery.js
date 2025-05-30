const buildMongoQuery = (ruleGroup) => {
  const mongoGroupOp = ruleGroup.operator === "AND" ? "$and" : "$or";

  const conditions = ruleGroup.rules.map((rule) => {
    if (rule.rules) {
      // Nested group
      return buildMongoQuery(rule);
    } else {
      const { field, operator, value } = rule;

      switch (operator) {
        case "=":
          return { [field]: value };
        case "!=":
          return { [field]: { $ne: value } };
        case ">":
          return { [field]: { $gt: value } };
        case "<":
          return { [field]: { $lt: value } };
        case ">=":
          return { [field]: { $gte: value } };
        case "<=":
          return { [field]: { $lte: value } };

        // String specific
        case "contains":
          return { [field]: { $regex: value, $options: "i" } };
        case "starts_with":
          return { [field]: { $regex: "^" + value, $options: "i" } };
        case "ends_with":
          return { [field]: { $regex: value + "$", $options: "i" } };

        // Date specific
        case "before":
          return { [field]: { $lt: new Date(value) } };
        case "after":
          return { [field]: { $gt: new Date(value) } };
        case "on_or_before":
          return { [field]: { $lte: new Date(value) } };
        case "on_or_after":
          return { [field]: { $gte: new Date(value) } };

        default:
          return {};
      }
    }
  });

  return { [mongoGroupOp]: conditions };
};

const aggregatedQueryPipeline = (mongoQuery) => [
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "customerId",
      as: "orders",
    },
  },
  {
    $match: mongoQuery,
  },
];

module.exports = { buildMongoQuery, aggregatedQueryPipeline };
