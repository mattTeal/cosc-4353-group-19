const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const valPass = require('./valUsrPss').validatePass;


const verifyCallback = (username, password, done) => {
    
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((userId, done) => {

})