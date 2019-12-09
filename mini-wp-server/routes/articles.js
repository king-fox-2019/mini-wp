"use strict";

const router = require("express").Router();
const articleController = require("../controllers/articleController");
const { authorization } = require("../middlewares/auth");
const { multer, sendUploadToGCS } = require("../middlewares/gcs");

router.post(
  "/",
  multer.single("image"),
  sendUploadToGCS,
  articleController.create
);
router.get("/", articleController.showAll);
router.get("/filter/:value", articleController.filter);

router.get("/:id", authorization, articleController.showOne);
router.put("/:id", authorization, articleController.update);
router.delete("/:id", authorization, articleController.remove);

module.exports = router;
