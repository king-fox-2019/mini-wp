var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
   secretAccessKey: `f+I3XeCijXDYL9jDTUkP3xc9Gr2QyrxG+NM4hA8D`,
   accessKeyId: `AKIAIUMISQC2E44R6ORA`,
   region: process.env.AWS_REGION
})

var s3 = new aws.S3({ /* ... */ })

// module.exports = (req, res, next) => {
//   if (!req.file) {
//     return next({
//         status: 400,
//         message: `Please Upload new Image`
//     })
//   } else if (!req.file.mimetype.includes('image')) {
//       return next({
//           status: 400,
//           message: `File Not Supported`
//       })
//   }
// }
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'zoezachary',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
       console.log(file)
      cb(null, file.originalname)
    }
  })
})

const singleUpload = upload.single('image')
 
// app.post('/upload', upload.array('photos', 3), function(req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
// })

module.exports = {
  upload,
  singleUpload
}