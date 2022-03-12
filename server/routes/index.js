const express = require("express");
const authRouter = require("./authRoutes");
const router = express.Router();

router.get("/", function(req, res) {
    console.log(req.user)
    res.status(200).send("Hello World from the Backend!");
});

router.use('/auth', authRouter);

module.exports = router;