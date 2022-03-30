const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const genPass = require('./valUsrPss').genPass;
const findUser = require('./valUsrPss').findUser;
const findUserId = require('./valUsrPss').findUserId;
const db = require('./database');


const verifyCallback = (username, password, done) => {
    const user = findUser(username);
    console.log(user)
    if (user === undefined){
        return done("User not found");
    }

    const hash = genPass(password, user.salt).hash;
    if(hash === user.hash){
        console.log("passwords match")
        return done(null, user);
    }
    console.log("passwords don't match")
    return done(null, false, {message: "Bad password"}) ;
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.userId);
})

passport.deserializeUser((userId, done) => {
    const user = findUserId(userId);
    if(user === undefined){
        return done("User not found")
    }

    return done(null, user);
})
