const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  createdTime: { type: Date, default: Date.now() },
  updatedTime: { type: Date, default: Date.now() },

  user_id: { type: String, unique: true },
  partner_id: { type: String, unique: true },
  bigImage: { type: String },
  events: [
    {
      name: { type: String, unique: true, required: true },
      image: { type: String, required: true },
      description: { type: String },
      date: { type: String },
      motion: { type: String },
      user_created: { type: String },
    },
  ],
});

const Event = mongoose.model("events", eventSchema, "events");
module.exports = Event;
