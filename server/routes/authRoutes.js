const express = require('express');
const router = express.Router();
const passport = require('passport');
const findUser = require('../valUsrPss').findUser;
const createUser = require('../valUsrPss').createUser;

const valregex = /^\w+$/i;

// router.get('/', (req, res) => {
//     res.status(200).send("here at auth");
// });

//login route
router.post("/login", passport.authenticate("local", {
    successReturnToOrRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
}));

//register route
router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmpass = req.body.confirmpass;

    console.log(req.body);

    // validate these two are valid.
    if(!valregex.test(username)){
        return res.status(428).send({message: 'Bad username'})
    }
    else if(!valregex.test(password) || password != confirmpass){
        return res.status(428).send({message: 'Bad password'})
    }

    // Check if user already exists, if so bad.
    if(findUser(username, password) != undefined){
        return res.status(428).send({message: 'User already exists. Register with new user.'})
        
    }

    // Go ahead and create a new user.
    createUser(username, password);

    console.log(req.body);

    // Redirect them somewhere.
    return res.redirect("http://localhost:3000/profile");

    // console.log(req.body);
    // res.status(200).send();

})

//logout
router.post("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/login");
})

module.exports = router;