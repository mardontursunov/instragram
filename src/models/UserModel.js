const client = require('../modules/mongo')
const Schema = require('mongoose').Schema

const UserSchema = new Schema({
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
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

async function createUser (phone, name, username, password) {
    const db = await UserModel()
    return await db.create({
        phone, name, username, password
    })
}

module.exports = {
    createUser
}
