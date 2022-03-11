const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const genPass = require('./valUsrPss').genPass;
const findUser = require('./valUsrPss').findUser;
const findUserId = require('./valUsrPss').findUserId;
let {mockDB} = require('./mockdatabase');


const verifyCallback = (username, password, done) => {
    const user = findUser(username);
    if (user === undefined){
        return done("User not found");
    }

    const hash = genPass(password).hash;
    if(hash === user.hash){
        return done(null, user);
    }

    return done(null, false, {message: "Bad password"}) ;
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {
    const user = findUserId(userId);
    if(user === undefined){
        return done("User not found")
    }

    return done(null, user);
})
