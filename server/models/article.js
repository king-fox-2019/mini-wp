const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please input the title for your article"],
      minlength: [4, "Title Minimum 4 Characters"],
      maxlength: [15, "Title Maximum 15 Characters"]
    },
    content: {
      type: String,
      required: [true, "Please input the content for your article"]
    },
    author: {
      type: String,
      required: [true, "Please input the author for your article"]
    },
    image: {
      type: String,
      required: [true, "Please input image article"]
    },
    tag: {
      type: Array,
      required: [true, "Please input the tag for your article"]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Article = model("Article", articleSchema);

module.exports = Article;
