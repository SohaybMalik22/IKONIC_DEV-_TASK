const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logs = new Schema(
  {
    userId: { type: String, required: false },
    isActive: { type: Boolean, required: false, default: false },
    createdAt: {
      type: Date,
      required: false,
      default: Date.now,
      // expires: "2d",
    },
    timestamp: { type: String, required: false },
    timestampUnix: { type: String, required: false },
  },
  { strict: false }
);

module.exports = mongoose.model("logs", logs);
