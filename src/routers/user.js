const express = require('express')
const User = require('../models/user')
const ToDo = require('../models/todo')
const config = require('../db/mysql');
const db = require('../db/mysql_connection')

const router = new express.Router()

//Login a user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByEmailAndPassword(req.body.email, req.body.password)
        await user.generateAuthToken()
        if (user){
            res.send('loged in')
        }else {
            res.send('unable to login')
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})

//creat new user
router.post('/newuser', async (req, res) => {
    const user = new User({
        name:'user2',
        email:'user2@gmail.com',
        password:'123456'
    })

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
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

//SQL SignUp new user in mysql DB
router.post('/sql/newuser', async (req, res) => {
    const result = await db.query(
        `INSERT INTO users 
        (name, email, password) 
        VALUES 
        (?, ?, ?)`, 
        [
          req.body.name, req.body.email, req.body.password
        ]
      );
    
      let message = 'Error in creating user';
    
      if (result.affectedRows) {
        message = 'user created successfully';
      }
    
      return {message};
    })



module.exports = router