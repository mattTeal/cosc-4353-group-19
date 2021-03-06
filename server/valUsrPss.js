const crypto = require("crypto");
let {mockDB} = require('./mockdatabase');
const {db} = require('./database');

function genPass(password, salt){
    const newSalt = salt ? salt : crypto.randomBytes(16).toString('hex')
    var genhash = crypto.pbkdf2Sync(password, newSalt, 10000, 64, "sha512").toString('hex');

    return{
        salt: newSalt,
        hash: genhash
    };
}

function genUserid(){
    var userid = crypto.randomBytes(16).toString('hex');
    return userid
}

function findUser(username){
    // const user = db.users.find(u => u.username === username);
    const user = db.query(
        'SELECT * FROM USERS WHERE Username = ?;',
        username,
    )
    return user;
}

function findUserId(id){
    const userid = db.users.find(u => u.userId === id)
    return userid;
}

function createUser(username, password){
    const salthash = genPass(password);
    const salt = salthash.salt;
    const hash = salthash.hash;

    const newUser = {
        userId: genUserid(),
        username: username,
        hash: hash,
        salt: salt,
    };

    return newUser;

}

function validatePass(password, hash, salt){
    var verhash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === verhash;
}

module.exports.validatePass = validatePass;
module.exports.genPass = genPass;
module.exports.genUserid = genUserid;
module.exports.findUser = findUser;
module.exports.findUserId = findUserId;
module.exports.createUser = createUser;