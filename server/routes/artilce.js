const router = require("express").Router();
const Article = require("../controllers/articleController");
const gcsUpload = require("gcs-upload");
const {
  authentication,
  authorization,
  authorizationMyArticle
} = require("../middlewares/auth");

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: "keyfile.json",
    bucketName: "mini-wp-v2"
  }
});

router.get("/", Article.readAll);
router.get("/tag/:tag", Article.searchByTag);
router.use(authentication);
router.post("/", upload.single("image"), Article.create);
router.get(
  "/myarticles/tag/:tag",
  authorizationMyArticle,
  Article.searchByTagMyArticle
);
router.get("/myarticles", authorizationMyArticle, Article.readMyArticle);
router.get("/readone/:articleId", authorization, Article.readOne);
router.put(
  "/:articleId",
  authentication,
  upload.single("image"),
  Article.updateArticle
);
router.delete("/:articleId", authorization, Article.deleteArticle);

module.exports = router;
