const express = require("express");
let router = express.Router();

router
    .route("/prices")
    .get((req, res) => {
        res.send("hello /Quotes/prices");
    })
    .post((req, res) => {
        res.send("hello /Quotes/prices");
    })

router
    .route("/prices/:priceid")
    .get((req, res) => {
        res.send("Hello /Quotes/Prices/" + req.params.priceid);
    })
    .post((req, res) => {
        res.send("Hello /Quotes/Prices/" + req.params.priceid);
    })

module.exports = router;