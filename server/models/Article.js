const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title can't be empty"]
    },
    content: {
      type: String,
      required: [true, "Content can't be empty"]
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    featured_image: String
  },
  { versionKey: false, timestamps: true }
);

const Article = model("Article", articleSchema);

module.exports = Article;
