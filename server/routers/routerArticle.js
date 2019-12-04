const router = require('express').Router();
const controllerArticle = require('../controllers/controllerArticle');

// view article
router.get("/", controllerArticle.viewArticle);
// input article
router.post("/", controllerArticle.createArticle);

module.exports = router;
