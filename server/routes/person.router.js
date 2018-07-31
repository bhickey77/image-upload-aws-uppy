const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // GET for ALL partners - admin view (can limit volume in query)
    if (req.isAuthenticated()){
        console.log('in GET route to get all partners');
        console.log('user', req.user);
        let queryText = `SELECT username, partner_id, date_created,
        date_updated FROM person WHERE user_type != 'admin'`;
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