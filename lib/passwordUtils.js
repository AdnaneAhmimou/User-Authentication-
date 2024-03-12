const crypto = require('crypto');

// compare the password with the hash
function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
     
}

// generate a hash for the password
function genPassword(password) {
    //salt is a random string of characters that is used to hash the password
    var salt = crypto.randomBytes(32).toString('hex');
    // pdbkdf2Sync is a function that is used to hash the password with the salt 
    // 10000 is the number of iterations
    // 64 is the length of the hash
    // sha512 is the hashing algorithm
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: genHash
    };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;