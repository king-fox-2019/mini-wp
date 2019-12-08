const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please input the title for your article"]
    },
    content: {
      type: String,
      required: [true, "Please input the content for your article"]
    },
    createdAt: {
      type: Date
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

articleSchema.pre("save", function(next) {
  this.createdAt = new Date().toISOString();
  next();
});

const Article = model("Article", articleSchema);

module.exports = Article;
