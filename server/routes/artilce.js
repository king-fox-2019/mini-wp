const router = require("express").Router();
const Article = require("../controllers/articleController");
const {
  authentication,
  authorization,
  authorizationMyArticle
} = require("../middlewares/auth");

router.get("/", Article.readAll);
router.use(authentication);
router.post("/", Article.create);
router.get("/myarticle", authorizationMyArticle, Article.readMyArticle);

module.exports = router;
