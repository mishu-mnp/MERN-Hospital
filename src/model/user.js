const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    phone: {
        type: String,
        required: true,
        min: 10
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


// Instance method to generate authorised token for user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)  // generating token
    user.tokens = user.tokens.concat({ token })  // storing token in User tokens
    await user.save()
    return token
}

// Logging User by its credentials
userSchema.statics.findByCredentials = async (email, password) => {
    // finding Is User exists?
    const user = await User.findOne({ email: email })
    // console.log(user)

    if (!user) {
        throw new Error('Cannot Login')
    }

    // If he exists then check password is correct?
    const isCorrectUser = await bcrypt.compare(password, user.password)
    // console.log(isCorrectUser)

    if (!isCorrectUser) {
        throw new Error('Cannot Login')
    }

    // If both Email and Password is correct then return User
    return user
}

// Before return whole fields of User we need to delete some specific fields
// This method runs all time when res strikes
userSchema.methods.toJSON = function () {
    const user = this
    const responseToUser = user.toObject()

    delete responseToUser.password
    delete responseToUser.tokens

    return responseToUser
}

// Encrypting password before to save in db
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password') || user.isNew) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User