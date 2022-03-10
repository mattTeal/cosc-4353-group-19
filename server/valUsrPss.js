const crypto = require("crypto")

function genPass(password){
    var salt = crypto.randomBytes(32).toString('hex');
    var genhash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString('hex');

    return{
        salt: salt,
        hash: genhash
    };
}

function validatePass(password, hash, salt){
    var verhash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === verhash;
}

module.exports.validatePass = validPass;
module.exports.genPass = genPass;