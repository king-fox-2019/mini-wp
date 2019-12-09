'use strict'

const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
  gcsConfig: {
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    bucketName: process.env.CLOUD_BUCKET
  }
})

module.exports = upload