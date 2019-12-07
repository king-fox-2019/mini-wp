const router = require("express").Router();
const User = require("../controllers/userController");
const gcsUpload = require("gcs-upload");
const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: "keyfile.json",
    bucketName: "mini-wp-v2"
  }
});

router.post("/signup", upload.single("image"), User.signUp);
router.post("/signin", User.signIn);

module.exports = router;
