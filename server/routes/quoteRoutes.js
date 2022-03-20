const express = require("express");
const router = express.Router();
const db = require('../database');
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    res.status(200).send(mockDB.quoteHistory);
})

router.post('/', (req, res) => {
    const {gallons, date} = req.body;
    console.log(gallons, date);
    try {
        db.promise().query(`INSERT INTO QUOTES VALUES('${gallons}', '${date}')`)
        res.status(201).send("Post completed");    
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;