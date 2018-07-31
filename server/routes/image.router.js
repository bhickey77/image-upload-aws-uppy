const express = require('express');
const pool = require('../modules/pool');

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
// router.post('/profilepicture/', upload.single('file'), (req, res, next) => {
//   console.log(`IN THE IMAGE ROUTER PROFILE PICTURE ROUTE`);
//   console.log(req.file);
//   console.log('file path: ', req.file.path);
  
//   uploadToS3(req.file, res);
// });

 
function uploadToS3(file, res) {
 fs.readFile(file.path)
  .then(data => {
    console.log(`file read: `, data);
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      signatureVersion: 'v4',
    });
    s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: file.filename,
        Body: data,
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        } else {
          console.log('success');
          console.log(data);
          let urlParams = {Bucket: 'local-crate-social-platform', Key: data.Key};
          s3bucket.getSignedUrl('getObject', urlParams, function(err, url) {
            if(err){
              console.log(`error with getsignedurl: `, err);
            } else {
              console.log(`url from getsignedurl: `, url);
              res.send(url)
            }       
          })
        }
      })
    })
  })
  .catch(error => {
    console.log(`error reading file: `, error);
  })
}

// router.get('/', (req, res) => {
//   console.log(`in get api/image`);
//   res.sendStatus(200);

// })

// module.exports = router;
