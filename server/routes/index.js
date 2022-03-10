const express = require("express");
const router = express.Router();
const app = express();

router.get("/", function(req, res) {
    res.status(200).send("Hello World from the Backend!");
});

const profileRouter = require("./profileRoutes");
const Quotes = require("./Quotes")
//app.use('/profile', profileRouter);

module.exports = router;