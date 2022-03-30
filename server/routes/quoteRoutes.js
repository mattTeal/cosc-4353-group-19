const express = require("express");
const router = express.Router();
const db = require('../database');
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    //res.status(200).send(mockDB.quoteHistory);
    // get data from database
    db.query('SELECT * FROM quotes', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    });    
})

router.post('/', (req, res) => {
    const {gallons, date, addressString, inState} = req.body;
    console.log(gallons, date);
    try {
        db.promise().query(`CALL quotePost(?, ?, ?, ?)`, [gallons, date, addressString, inState]);
        res.status(201).send({message: "Post completed with status code 201."});    
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;