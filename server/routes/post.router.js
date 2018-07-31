const express = require('express');
const router = express.Router();

const upload = multer({ dest: '../uploads/' });
const uploadPost = require('../modules/uploadPost');

router.post('/', upload.single('file'), (req, res) => {
    if (req.isAuthenticated()){
        uploadPost(req, res);
    } else {
        res.sendStatus(500);
    } 
});

module.exports = router;