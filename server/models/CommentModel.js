const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    datePosted: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
