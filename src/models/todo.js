const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    information: {
        type: String,
        required: true,
        trim: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const ToDo = mongoose.model('ToDo', todoSchema)

module.exports = ToDo