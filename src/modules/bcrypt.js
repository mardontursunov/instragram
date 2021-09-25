const bcrypt = require('bcrypt')

function generateCrypt (data){
    let salt = bcrypt.genSaltSync(10)
    let crypt = bcrypt.hashSync(data, salt)
    return crypt
}

function checkCrypt (data, crypt){
    return bcrypt.compareSync(data, crypt)
}

module.exports = {
    generateCrypt,
    checkCrypt
}