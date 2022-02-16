const express = require('express')
const User = require('../model/user');
const router = new express.Router();
const auth = require('../middleware/auth');

// User End-point
// Signup/Create User 


router.post('/user', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(500).send({ error: 'Please enter valid details' })
    }
})

// Login Route
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(404).send({ error: 'Check your email and password' })
    }
})

// Logout Route
router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({ logout: 'Successfully logout' })
    } catch (e) {
        res.status(500).send({ error: e })
    }
})

// Read User 
router.get('/user/me', auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(501).send({ error: 'Please Authenticate!!!' })
    }
})


module.exports = router