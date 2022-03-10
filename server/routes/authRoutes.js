const express = require('express')
const router = require('.')
const authRouter = express.Router()
const passport = require('passport');
const genPass = require('../valUsrPss').genPass;

const valregex = /\w/;

//login route
authRouter.post("/login", passport.authenticate("local", {
    successReturnToOrRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
}));

//register route
authRouter.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // validate these two are valid.

 
    // Check if user already exists, if so bad.

    // Go ahead and create a new user.

    // Redirect them somewhere.
    res.status(200).send({message: "Successful Creation"}).redirect("/profile")

})

//logout
authRouter.post("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
})



module.exports = authRouter