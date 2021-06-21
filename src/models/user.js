const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const ToDo = require('./todo')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

}, {
    timestamps: true
})

userSchema.virtual('todoList', {
    ref: 'ToDo',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this//for the instance of the user (just for help)
    
    const token = jwt.sign({ _id: user._id.toString() }, 'Dffyyy888TY4##')

    //here we add the generated token to the tokens array
    user.tokens = user.tokens.concat({ token })

    await user.save()

    return token
}

userSchema.statics.findByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User