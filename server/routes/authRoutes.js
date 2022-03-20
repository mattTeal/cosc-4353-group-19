const express = require('express');
const router = express.Router();
const passport = require('passport');
const findUser = require('../valUsrPss').findUser;
const createUser = require('../valUsrPss').createUser;
const db = require('../database');

const valregex = /^\w+$/i;

// router.get('/', (req, res) => {
//     res.status(200).send("here at auth");
// });

//login route
router.post("/login", passport.authenticate("local", {
    //successRedirect: "http://localhost:3000/profile",
    //failureRedirect: "http://localhost:3000/",
    //failureMessage: true
}), (req, res) => {
    let url = (mockDB["authInfo"].profileCompleted?"http://localhost:3000/fuel":"http://localhost:3000/profile");
    res.status(200).send(url);
});

// router.post("/login", (req, res) => {
//     if (req.isAuthenticated())
//       return res.redirect('http://localhost:3000/profile"');
//     const authenticateUser = passport.authenticate('local', {
//       successReturnToOrRedirect: "http://localhost:3000/profile",
//       failureRedirect: "http://localhost:3000/"
//     })
//     authenticateUser(req, res, () => res.redirect('http://localhost:3000/'))
//   });

//get entire database route for testing
/*router.get("/getDatabase", (req,res) => {
    res.status(200).send(JSON.stringify(mockDB));
}) */

//register route
router.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmpass = req.body.confirmpass;

    //console.log(req.body);

    // validate these two are valid.
    if(!valregex.test(username)){
        //return res.redirect("http://localhost:3000/register") //
        return res.status(428).send({message: 'Bad username'})
    }
    else if(!valregex.test(password) || password != confirmpass){
        //return res.redirect("http://localhost:3000/register") 
        return res.status(428).send({message: `Bad password`})
    }

    // Check if user already exists, if so bad.
    if(findUser(username, password) != undefined){
        return res.status(428).send({message: 'User already exists. Register with new user.'})
        
    }

    // Go ahead and create a new user.
    const newUser = createUser(username, password);

    console.log(req.body);

    try {
        db.promise().query(`INSERT INTO USERS VALUES(
            '${newUser.userId}', 
            '${username}',
            '${newUser.hash}',
            '${newUser.salt}'
            )`
        )
        res.status(201).send("Post completed");    
    } catch (error) {
        console.log(error)
    }

    // Redirect them somewhere.
    // return res.redirect("http://localhost:3000/profile");

    // console.log(req.body);
})

//logout
router.post("/logout", (req, res) => {
    req.logout(); 
    //res.redirect("http://localhost:3000/"); //<- this wasn't working on angel's computer, so we did a workaround
    res.status(301).send("http://localhost:3000/")
})

module.exports = router;