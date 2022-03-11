const express = require('express');
const router = express.Router();
//const passport = require('passport');
/*const findUser = require('../valUsrPss').findUser;
const createUser = require('../valUsrPss').createUser;

const valregex = /^\w+$/;*/

router.get('/', (req, res) => {
    res.status(200).send("here at auth");
});

//login route
/*router.post("/login", passport.authenticate("local", {
    successReturnToOrRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
}));

//register route
router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmpass = req.body.confirmpass;

    // validate these two are valid.
    if(!valregex.test(username)){
        res.send({message: 'Bad username'})
    }
    else if(!valregex.test(password) || password != confirmpass){
        res.send({message: 'Bad password'})
    }

    // Check if user already exists, if so bad.
    if(findUser(username, password)){
        res.send({message: 'User already exists. Register with new user.'})
        return;
    }

    // Go ahead and create a new user.
    createUser(username, password);

    // Redirect them somewhere.
    res.status(200).send({message: "Successful Creation"}).redirect("/profile");

})

//logout
router.post("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
})*/

module.exports = router;