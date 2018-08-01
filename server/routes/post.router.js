const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });
const { uploadPost, uploadPostWithText } = require('../modules/uploadPost');

router.post('/image', upload.single('file'), (req, res) => {
    uploadPost(req, res);
});

router.post('/imageAndText', upload.single('file'), (req, res) => {
    uploadPostWithText(req, res);
});

router.get('/', (req, res) => {
    const queryText = `SELECT * from post`;
    pool.query(queryText)
        .then(response => { res.send(response.rows) })
        .catch(error => { res.sendStatus(500) })
})

module.exports = router;