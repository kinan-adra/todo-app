const express = require('express')
const User = require('../models/user')
const ToDo = require('../models/todo')

const router = new express.Router()

//creat new user
router.post('/newuser', async (req, res) => {
    const user = new User({
        name:'user1',
        email:'user1@gmail.com'
    })

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Get todo information for specific user
router.get('/users/:userid/:todoId', async (req, res)=> {
    const owner = req.params.userid
    const todoId = req.params.todoId

    const todo = await ToDo.findOne({_id: todoId})
    
    try {
        res.status(200).send(todo)
    } catch (error) {
        res.status(400).send(error)
    }

})

//Get all todo for specific user
router.get('/all/:userid', async (req, res)=> {
    const userId = req.params.userid
    const user = await User.findById({_id: userId})

    try {
        await user.populate('todoList').execPopulate()
        res.send(user.todoList)
    } catch (error){
        res.send('Error in getting all todo')
    }
})

module.exports = router