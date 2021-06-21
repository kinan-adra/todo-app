const mongoose = require('mongoose')
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

}, {
    timestamps: true
})

userSchema.virtual('todoList', {
    ref: 'ToDo',
    localField: '_id',
    foreignField: 'owner'
})


const User = mongoose.model('User', userSchema)

module.exports = User