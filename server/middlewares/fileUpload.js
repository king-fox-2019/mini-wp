const gcsUpload = require('gcs-upload')

const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './service-account.json',
      bucketName: 'wowordpress.appspot.com'
    }
  })
  
  module.exports = { upload }