const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ----------- Routes -------------//
//  POST /newPost - create new posting
//  GET /getPostget - all posts
//  GET /getSupplierPosts - get all posts from particular supplier
//  PUT /editSupplierPost/:id - edit post by id
//  PUT /flagPost/:id - flag post by id
//  DELETE /deletePost/:id - delete post by id
//  DELETE /deleteSupplier/:id - delete supplier by id
// --------------------------------//

router.get('/getPosts', (req, res) => {
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

router.get('/getSupplierPosts', (req, res) => {
    // GET for all posts from specific supplier
    if (req.isAuthenticated()){
        console.log('in GET route to get all posts from a supplier');
        console.log('user', req.user);
        let queryText = `SELECT * FROM post WHERE supplier_id =$1`;
        pool.query(queryText, [req.body.supplier_id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

router.put('/editSupplierPost/:id', (req, res) => {
    // PUT for editing text in a post
    if(req.isAuthenticated()){
        queryText = `UPDATE post SET text = $2 where id = $1;`;
        pool.query(queryText, [req.body.id, req.body.edit_value]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling PUT for /editSupplierPost:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.put('/flagPost/:id', (req, res) => {
    // PUT for admin flagging a post
    if(req.isAuthenticated()){
        if (req.body.isflagged == true){
            queryText = `UPDATE post SET isflagged = false where id = $1;`;
        } else {
            queryText = `UPDATE post SET isflagged = true where id = $1;`;
        }
        pool.query(queryText, [req.body.id]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling PUT for /flagPost:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.delete('/deletePost/:id', (req, res) => {
    //DELETE for admin or supplier to delete a post
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

router.delete('/deleteSupplier/:id', (req, res) => {
    //DELETE for admin to delete supplier entirely
    if(req.isAuthenticated()){
        queryText = `DELETE FROM person where id = $1;`;
        pool.query(queryText, [req.params.id]).then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error handling DELETE for /deletePost:', error);});
    } else {
        res.sendStatus(403);
    }
});

router.post('/newPost', (req, res) => {
    //POST for supplier creating a new post
    if (req.isAuthenticated()){
        console.log('this is req.body for new posting', req.body);
        const isflagged = true;
        const date_created = new Date().toJSON().toString();
        const date_updated = "n/a";
        const queryText = `INSERT INTO post (supplier_id, "title", "text", "media_url", "date_created", "date_updated", isflagged)
        VALUES($1, $2, $3, $4, $5, $6, $7)`;
        pool.query(queryText, [
            req.user.id,
            req.body.title,
            req.body.text,
            req.body.media_url,
            date_created,
            date_updated,
            isflagged
        ]).then((result) => {
            console.log('back from db with:', result);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('error in POST', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    } 
});


module.exports = router;