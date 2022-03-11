const express = require("express");
const router = express.Router();
let { mockDB } = require("../mockdatabase");

router.get('/', (req, res) => {
    res.status(200).send(mockDB.quoteHistory);
})

router.post('/', (req, res) => {
    const quoteData = {
        gallons: req.body.gallonsForm.trim(),
        timestamp: req.body.timestampForm.trim(),
        totalCost: req.body.totalCostForm.trim(),
        stateCode: req.body.stateCodeForm.trim(),
    }
    const regexGallons = /\s+\d{1,6}\s+/;

    if (!regexGallons.test(quoteData.gallons)) res.status(400).send("Gallons must be positive whole numbers!")
    else {
        mockDB["quoteHistory"] = JSON.stringify(quoteData);
        res.status(200).send("Post completed");
    }
});

module.exports = router;