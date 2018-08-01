const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });
const { uploadPost, uploadPostWithText } = require('../modules/uploadPost');

router.post('/image', upload.single('file'), (req, res) => {
    uploadPost(req, res);
});

router.post('/imageAndText', upload.single('file'), (req, res) => {
    uploadPostWithText(req, res);
});

module.exports = router;