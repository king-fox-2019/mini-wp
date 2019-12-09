const router = require("express").Router();
const ArticleController = require("../controllers/ArticleController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const gcsUpload = require("gcs-upload");

const upload = gcsUpload({
  gcsConfig: {
    keyFilename: process.env.GCS_PATHFILE,
    bucketName: "wordpresskw-bucket.syirilrakhulh.com"
  }
});

router.post("/image", upload.single("file"), (req, res) => {
  res.status(200).json(req.body.file);
});

router.use(authentication);

router.post("/", ArticleController.createArticle);
router.get("/", ArticleController.readArticle);
router.put("/:id", authorization, ArticleController.updateArticle);
router.delete("/:id", authorization, ArticleController.deleteArticle);

module.exports = router;
