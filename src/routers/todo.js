const express = require('express')
const ToDo = require('../models/todo')

const router = new express.Router()

//Add new todo for specific user
router.post('/addtodo/:id', async (req, res) => {

    const todo = new ToDo({
        ...req.body,
        owner: req.params.id
    })

    try {
        await todo.save()
        res.status(201).send(todo)
    } catch (error) {
        res.status(400).send(error)
    }
})

//Update an existing todo for specific user
router.patch('/todo/:id', async (req, res) => {
        const {information,isDone} = req.body
        
        try {
            const todo = await ToDo.findByIdAndUpdate({ _id: req.params.id},{information,isDone})
    
            if (!todo) {
                return res.status(404).send('todo not exist')
            }

            await todo.save()
            res.send('todo updated successfully')
        } catch (error) {
            res.status(400).send(error)
        }
    })
//Delete an existing todo for specific user
    router.delete('/todo/:id', async (req, res) => {
            try {
                const todo = await ToDo.findOneAndDelete({ _id: req.params.id})
        
                if (!todo) {
                    res.status(404).send('todo not exist')
                }
        
                res.send('todo deleted successfully')
            } catch (error) {
                res.status(500).send('error',error)
            }
        })
    

module.exports = router