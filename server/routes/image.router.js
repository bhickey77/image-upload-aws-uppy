const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });
const uploadPost = require('../modules/uploadPost');

router.post('/', upload.single('file'), (req, res) => {
    console.log('hit POST /api/image/');
    console.log(uploadPost);
    uploadPost(req, res);
});

module.exports = router;