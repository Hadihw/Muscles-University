const mongoose = require("mongoose");

const feedsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: false,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      default: [],
    },
  ],
  status: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});

const Feeds = mongoose.model("Feeds", feedsSchema);

module.exports = Feeds;
