const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
  createdTime: { type: Date, default: Date.now() },
  updatedTime: { type: Date, default: Date.now() },

  user_id: { type: String, unique: true },
  partner_id: { type: String, unique: true },
  images: [
    {
      type: String,
    },
  ],
});

const Memory = mongoose.model("memories", memorySchema, "memories");
module.exports = Memory;
