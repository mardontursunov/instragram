const client = require('../modules/mongo')
const Schema = require('mongoose').Schema

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    }
})

async function UserModel () {
    let db = await client()
    return await db.model('users', UserSchema)
}

async function createUser (email, password) {
    if(!(email && password)) throw new ReferenceError("Email or Password is not defined")
    let model = await UserModel()
    let data = await model.create({ email: email, password: password })
    await data.save()
}

module.exports = {
    createUser
}