const jwt = require('jsonwebtoken');
const User = require('../model/user');

const auth = async (req, res, next) => {
    try {
        const token = await req.header('Authorization').split(' ')[1];
        const decodeUser = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({ _id: decodeUser._id, 'tokens.token': token })

        // console.log(token)

        if (!user) {
            res.status.send({ error: 'Please Authenticate' })
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(501).send({ error: 'Please Authenticate' })
    }

}

module.exports = auth