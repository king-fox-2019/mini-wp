"use strict"

const router = require('express').Router();
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Mini-WP!'
  })
})

router.use('/users', usersRouter);
router.use(authentication);
router.use('/articles', articlesRouter);

module.exports = router;