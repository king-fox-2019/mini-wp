const gcsupload = require('gcs-upload')

const upload = gcsupload(
    {
    limits:{
        fileSize:1e6
    },
    gcsConfig:{
        keyFilename:process.env.KEY_FILE,
        bucketName:'mini_wordpress'
    }
})

module.exports = {upload}