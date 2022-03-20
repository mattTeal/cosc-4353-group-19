const express = require("express");
const router = express.Router();
const db = require('../database');
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    res.status(200).send(mockDB.quoteHistory);
})

router.post('/quotes', (req, res) => {
    const quoteData = {
        gallons: req.body.gallons.trim() || "",
        date: req.body.date || "",
    }
    console.log(quoteData);
    try {
        db.promise().query(`INSERT INTO QUOTES VALUES('${gallons}', '${date}'`)
        res.status(201).send("Post completed");    
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;