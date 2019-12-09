const jwt = require("../helpers/jsonwebtoken");
const Article = require("../models/Article");

module.exports = (req, res, next) => {
  const id = req.params.id;
  Article.findById(id)
    .then(article => {
      if (article.author == req.payload._id) next();
      else {
        res.status(403).json({ message: "Error forbidden" });
      }
    })
    .catch(() => {
      res.status(404).json({ Name: "NotFound", Message: "Error not found" });
    });
};
