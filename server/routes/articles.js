const articles = require('express').Router()
const { ArticleController } = require('../controllers')
const { authorize } = require('../middlewares/auth')
const gcsUpload = require('gcs-upload')
const upload = gcsUpload({
  // limits: {
  //   fileSize: 1e6 // in bytes
  // },
  gcsConfig: {
    keyFilename: process.env.GCS_KEYFILE_PATH,
    bucketName: process.env.GCS_BUCKET_NAME
  }
})

articles.post('/', ArticleController.createArticle)
articles.post('/image', upload.single('image'), ArticleController.HandleImage)
articles.get('/', ArticleController.getAllPostedArticles)
articles.get('/:id', ArticleController.getOneArticle)

articles.use('/:id', authorize)
articles.put('/:id', ArticleController.editArticle)
articles.delete('/:id', ArticleController.deleteArticle)

module.exports = articles
