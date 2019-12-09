const express = require('express');
const router = express.Router();
const articleRoutes = require('../routes/articleRoutes.js');
const userRoutes = require('../routes/userRoutes.js');
const imageRoutes = require('../routes/imageRoutes.js');

router.use('/images', imageRoutes)
router.use('/articles', articleRoutes)
router.use('/users', userRoutes)

module.exports = router