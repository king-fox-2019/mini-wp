"use strict";

const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required"
    },
    content: {
      type: String,
      required: "Contet is required"
    },
    tags: {
      type: Array,
      default: []
    },
    image: String,
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Article", ArticleSchema);
