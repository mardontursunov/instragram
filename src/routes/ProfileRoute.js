const router = require('express').Router();
const UserMiddleware = require('../middlewares/UserMiddleware')
const upload = require('express-fileupload')
const fs = require('fs/promises')
const fsOld = require('fs')
const path = require('path')
const { findUser } = require('../models/UserModel')
const { myFollowers } = require('../models/FollowerModel')

router.use(UserMiddleware)

router.get('/', UserMiddleware, async (req, res) => {
    let user = await findUser(req.user.username)
    let followers = await myFollowers( req.user._id )
    console.log(followers);
    const photoPath = path.join(__dirname, '..', 'public', 'avatar', `${req.user._id}.jpg`)
    let isExist = fsOld.existsSync(photoPath)
    res.render('index', {
        title: "Home Page",
        user: user,
        photo: isExist,
        thisUser: req.user
    })
})

router.get('/:username', UserMiddleware, async (req, res) => {
    const { username } = req.params
    let user = await findUser(username)
    console.log(user);
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
    const { username } = req.params
    let user = await findUser(username)

    console.log(user);
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

module.exports = {
    path: '/profile',
    router: router
}