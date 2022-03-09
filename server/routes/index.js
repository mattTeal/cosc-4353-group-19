const express = require("express");
const router = express.Router();
//let { mockDB } = require("../mockdatabase"); // for testing

router.get("/", function(req, res) {
    //res.send(mockDB.quoteHistory[0]);
    res.status(200).send("Hello World from the Backend!");
});

const profileRouter = require("./profileRoutes");
router.use('/profile', profileRouter);

module.exports = router;