const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const QuerySchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Open", "InProgress", "Closed"],
    default: "Open",
  },
  resolution: {
    type: String,
    maxlength: 100,
  },
  notes: [NoteSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Query", QuerySchema);
