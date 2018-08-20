const pool  = require('../modules/pool');
const fs    = require('fs-extra');
const AWS   = require('aws-sdk');

const BUCKET_NAME     = process.env.bucket_name;
const IAM_USER_KEY    = process.env.aws_access_key_id;
const IAM_USER_SECRET = process.env.aws_secret_access_key;
 
const verbose = false; //turns on and off console.logs

const uploadPost = async (req, res) => {
  let media_key = await uploadToS3(req.file, res);
  uploadToSQL(req, media_key, res);
}

const uploadPostWithText = async (req, res) => {
  let media_key = await uploadToS3(req.file, res);
  uploadToSQLWithText(req, media_key, res);
}

const generateSignedUrls = async (res, rows) => {
    const newRows = await addSignedUrls(rows);
    verbose && console.log({newRows});
    res.send(newRows);
}

const addSignedUrls = async rows => {
    const newRows = [];
    for(const row of rows){
      const media_url = await generateSignedUrl(row.media_key);
      row.media_url = media_url;
      newRows.push(row);
    }  
    return new Promise(resolve => {
      resolve(newRows);
    })
}

function generateSignedUrl(key) {
  return new Promise(revolve => {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      signatureVersion: 'v4',
      region: 'us-east-1',
    });
    let urlParams = {Bucket: BUCKET_NAME, Key: key};
    verbose && console.log({urlParams});
    s3bucket.getSignedUrl('getObject', urlParams, function(error, url) {
      if(error){
        verbose && console.log(error);
        resolve('');
      } else {
        verbose && console.log('url in getsigned response: ', url);
        revolve(url);
      }
      verbose && console.log(url, error);
      
    })
  })
}

function uploadToS3(file, res) {
  return new Promise(resolve => {
    fs.readFile(file.path)
      .then(data => {
        verbose && console.log(`file read: `, data);
        let s3bucket = new AWS.S3({
          accessKeyId: IAM_USER_KEY,
          secretAccessKey: IAM_USER_SECRET,
          Bucket: BUCKET_NAME,
          signatureVersion: 'v4',
          region: 'us-east-1',
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

function uploadToSQL(req, media_key, res) {
  return new Promise(resolve => {
    const queryText = `INSERT INTO post 
                        ("media_key")
                        VALUES
                        ($1)`;
    
    pool.query(queryText, [media_key])
      .then((result) => {
        verbose && console.log('back from db with:', result);
        res.sendStatus(200);
      })
      .catch((error) => {
        verbose && console.log('error in POST', error);
        res.sendStatus(500);
      })
  })
}

function uploadToSQLWithText(req, media_key, res) {
  return new Promise(resolve => {
    const title = req.body.title;
    const content = req.body.content;
    const queryText = `INSERT INTO post 
                        ("media_key", "title", "content")
                        VALUES
                        ($1, $2, $3)`;
    
    pool.query(queryText, [media_key, title, content])
      .then((result) => {
        verbose && console.log('back from db with:', result);
        res.sendStatus(200);
      })
      .catch((error) => {
        verbose && console.log('error in POST', error);
        res.sendStatus(500);
      })
  })
}

module.exports = {uploadPost, uploadPostWithText, generateSignedUrls};
