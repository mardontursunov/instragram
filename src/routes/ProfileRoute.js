const router = require('express').Router();
const UserMiddleware = require('../middlewares/UserMiddleware')
const upload = require('express-fileupload')
const fs = require('fs/promises')
const fsOld = require('fs')
const path = require('path')
const { findUser } = require('../models/UserModel')
const { myFollowers, findFollower, addFollower, deleteFollower } = require('../models/FollowerModel')

router.use(UserMiddleware)

router.get('/', UserMiddleware, async (req, res) => {
    let user = await findUser(req.user.username)
    let followers = await myFollowers( req.user._id )
    const photoPath = path.join(__dirname, '..', 'public', 'avatar', `${req.user._id}.jpg`)
    let isExist = fsOld.existsSync(photoPath)
    res.render('index', {
        title: "Home Page",
        user: user,
        photo: isExist,
        thisUser: req.user
    })
})


router.post('/follow', UserMiddleware, async (req, res) => {
    try {
        const { username } = req.body
        let { _id: follow_id } = await findUser(username)
        let { _id: user_id } = req.user
        
        let followOld = await findFollower(user_id, follow_id)
        if(followOld) {
            await deleteFollower(user_id, follow_id)
        } else {
            await addFollower(user_id, follow_id)
        }
        res.status(200).send({
            ok: true,
            followOld: followOld ? true : false,
            message: "Follower added successfuly!"
        })
        
    } catch (e) {
        res.status(400).send({
            ok: false,
            message: "Bad request"
        })
    }
    
    
})

router.get('/followers', async (req, res) => {
    try {
        const { username } = req.query
        let { _id } = await findUser(username)
        let followers = await myFollowers(_id)
        followers = await followers.map(follower => {
            const photoPath = path.join(__dirname, '..', 'public', 'avatar', `${follower.user_id}.jpg`)
            let isExist = fsOld.existsSync(photoPath)
            return {
                id: follower.user[0]._id,
                name: follower.user[0].name,
                username: follower.user[0].username ,
                isExist
            }
        })
        console.log(followers);
        
    } catch (e) {
        console.log(e);
        res.status(400).send({
            ok: false
        })
    }
})

router.post('/photo', upload({ size: (1024 * 10) * 1024}), async (req, res) => {
    try {
        const photoPath = path.join(__dirname, '..', 'public', 'avatar', `${req.user._id}.jpg`)
        const fileStream = await fs.writeFile(photoPath, req.files.photo.data)
        res.send({
            ok: true
        })
    } catch (e) {
        console.log(e);
        res.send({
            ok: false
        })
    }
})

router.get('/:username', UserMiddleware, async (req, res) => {
    const { username } = req.params
    let user = await findUser(username)
    let followers = await myFollowers( req.user._id )
    let followOld = await findFollower(req.user._id, user._id)

    const photoPath = path.join(__dirname, '..', 'public', 'avatar', `${req.user._id}.jpg`)
    let isExist = fsOld.existsSync(photoPath)
    res.render('index', {
        title: "Home Page",
        user: user,
        photo: isExist,
        thisUser: req.user,
        oldFollow: followOld ? true : false
    })
})

module.exports = {
    path: '/profile',
    router: router
}