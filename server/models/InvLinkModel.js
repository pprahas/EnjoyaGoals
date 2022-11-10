const mongoose = require("mongoose");

const invLinkSchema = mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  maxUses: {
    type: Number,
    required: true,
  },
});

const invLink = mongoose.model("InvLink", invLinkSchema);

module.exports = invLink;
