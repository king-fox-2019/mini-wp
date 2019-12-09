'use strict';

const gcsUpload = require('gcs-upload') 

const cloudUpload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: 'hacktiv8-immersive-6193e9b7eff9.json',
        bucketName: 'mini-wp.prograami.com'
    }
})

module.exports = cloudUpload;