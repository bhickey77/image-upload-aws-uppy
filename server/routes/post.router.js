const express = require('express');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });
const uploadPost = require('../modules/uploadPost');

router.post('/', upload.single('file'), (req, res) => {
    uploadPost(req, res);
});

module.exports = router;