const pool  = require('../modules/pool');
const fs    = require('fs-extra');
const AWS   = require('aws-sdk');

const BUCKET_NAME     = process.env.bucket_name;
const IAM_USER_KEY    = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;
 
async function uploadPost(req, res) {
  let media_key = await uploadToS3(req.file, res);
  let media_url = await generateSignedUrl(media_key, res);
  await uploadToSQL(req, media_url, res);
}


function uploadToS3(file, res) {
  return new Promise(resolve => {
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
          s3bucket.upload(params, function (error, data) {
            if (error) {
              res.sendStatus(500);
            }
            resolve(data.Key);
          })
        })
      })
      .catch(error => {
        res.sendStatus(500);
      })
  })
}

function generateSignedUrl (media_key, res) {
  return new Promise(resolve => {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      signatureVersion: 'v4',
    });
    let urlParams = {Bucket: process.env.bucket_name, Key: media_key};
    s3bucket.getSignedUrl('getObject', urlParams, function(error, url) {
      if(error){
        console.log(`error with getsignedurl: `, error);
        res.sendStatus(500);
      } else {
        console.log(`url from getsignedurl: `, url);
        resolve(url);
      }       
    })
  })
}

function uploadToSQL(req, media_url, res) {
  return new Promise(resolve => {
    const is_marked_as_hidden = false;
    const date_created = new Date().toJSON().toString();
    const date_updated = new Date().toJSON().toString();
    const queryText = `INSERT INTO post 
                        ("media_url")
                        VALUES
                        ($1)`;
    
    pool.query(queryText, [media_url])
      .then((result) => {
        console.log('back from db with:', result);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error in POST', error);
        res.sendStatus(500);
      })
  })
}

module.exports = uploadPost;
