const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });

const uploadPost = require('../modules/uploadPost');

router.put('/:id', (req, res) => {
    // PUT for editing text in a post
    if(req.isAuthenticated()){
        queryText = `UPDATE post SET content = $2 where id = $1;`;
        pool.query(queryText, [req.body.id, req.body.edit_value]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling PUT for /editSupplierPost:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    //DELETE for admin or partner to delete a post
    if(req.isAuthenticated()){
        queryText = `DELETE FROM post where id = $1;`;
        pool.query(queryText, [req.params.id]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling DELETE for /deletePost:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.post('/', upload.single('file'), (req, res) => {
    if (req.isAuthenticated()){
        uploadPost(req, res);
    } else {
        res.sendStatus(500);
    } 
});

router.get('/', (req, res) => {
    // GET for ALL posts - public view (can limit volume in query)
    if (req.isAuthenticated()){
        console.log('in GET route to get all posts');
        console.log('user', req.user);
        let queryText = `SELECT * FROM post`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;