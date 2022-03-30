const express = require('express');
const router = express.Router();
const passport = require('passport');
const findUser = require('../valUsrPss').findUser;
const createUser = require('../valUsrPss').createUser;
const {db} = require('../database');
const { validatePass } = require('../valUsrPss');

const valregex = /^\w+$/i;

// router.get('/', (req, res) => {
//     res.status(200).send("here at auth");
// });

//login route
router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM USERS WHERE Username = ?;",
        username,
        (err, result) => {
          if (err) {
            res.send({ err: err });
          }
          console.log(result);
          if (result.length > 0) {
            if (validatePass(password, result[0].Hash, result[0].Salt))
                res.status(201).send(result);
            else
                res.status(403).send("Incorrect username or password!")
          } else {
            res.status(404).send("User doesn't exist");
          }
        }
      );
    
})

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

    // Go ahead and create a new user.
    const newUser = createUser(username, password);

    console.log(req.body);

    try {
        db.promise().query(`CALL registerPost(
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