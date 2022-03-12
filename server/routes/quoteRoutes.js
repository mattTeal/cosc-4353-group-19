const express = require("express");
const router = express.Router();
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    res.status(200).send(mockDB.quoteHistory);
})

router.post('/', (req, res) => {
    const quoteData = {
        gallons: req.body.gallons.trim() || "",
        date: req.body.date || "",
    }
    console.log(quoteData);
    mockDB["quoteHistory"] = JSON.stringify(quoteData);
    res.status(200).send("Post completed");
});

module.exports = router;