const gcsUpload = require('gcs-upload')
const keyfile = process.env.KEY_FILE_NAME
const BucketName = process.env.BUCKET_NAME


const upload = gcsUpload({
    gcsConfig: {
      keyFilename: keyfile,
      bucketName: BucketName
    }
  })

module.exports = upload