const express = require("express");
const router = express.Router();
//let { mockDB } = require("../mockdatabase"); // for testing

router.get("/", function(req, res) {
    //res.send(mockDB.quoteHistory[0]);
    res.status(200).send("Hello World from the Backend!");
});

const profileRouter = require("./profileRoutes");
router.use('/profile', profileRouter);

const quoteRouter = require("./quoteRoutes");
router.use('/quotes', quoteRouter);

const authRouter = require("./authRoutes");
router.use('/auth', authRouter);

module.exports = router;