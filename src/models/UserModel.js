const client = require('../lib/mongo')
const Schema = require('mongoose').Schema

const FollowerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId
    }
})

const UserSchema = new Schema({
    phone: {
        type: Number,
        unique: true,
        index: true,
        trim: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bdate: {
        bmonth: {
            type: String,
        },
        bday: {
            type: Number,
        },
        byear: {
            type: Number,
        }
    },
    follower: [

    ]
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
async function updateDate (ObjectId, bdate){
    const db = await UserModel()
    return await db.updateOne({_id: ObjectId}, { bdate })
}

async function findUser (login) {
    let object = ((typeof login) == "string") ? { username: login } : { phone: login }
    const db = await UserModel()
    return await db.findOne( object )
}

module.exports = {
    createUser,
    updateDate,
    findUser
}
