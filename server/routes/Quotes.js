const express = require("express");
let router = express.Router();

router
    .route("/")
    .get((req, res) => {
        res.send("hello /Quotes/");
    })
    .post((req, res) => {
        res.send("hello /Quotes/");
    })

router
    .route("/:quoteid")
    .get((req, res) => {
        res.send("Hello /Quotes/" + req.params.quoteid);
    })
    .post((req, res) => {
        res.send("Hello /Quotes/" + req.params.quoteid);
    })

module.exports = router;