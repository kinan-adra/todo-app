const express = require('express')
const ToDo = require('../models/todo')

const config = require('../db/mysql');
const db = require('../db/mysql_connection')

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

//SQL add new todo for specific user
router.post('/sql/addtodo/:id', async (req, res) => {

    const user_id = req.params.id
    const {information, isDone} = req.body

    const result = await db.query(
        `INSERT INTO todo 
        (information, isDone, owner) 
        VALUES 
        (?, ?, ?)`, 
        [
          information,
          isDone,
          user_id
        ]
      ) 
      res.send('todo added successfully')
})

//SQL Update an existing todo for specific user
router.patch('/sql/todo/:id', async (req, res) => {
    const {information,isDone} = req.body
    const owner = req.params.id
    
    try {  
        const result = await db.query(
            `UPDATE todo 
            SET information=?,
            isDone=?
            WHERE owner=?`, 
            [
              information,
              isDone,
              owner
            ]
          )
        res.send('todo updated successfully')
    } catch (error) {
        res.status(400).send(error)
    }
})

//SQL delete an existing todo for specific user
router.delete('/sql/todo/:id', async (req, res) => {
    const owner = req.params.id
    
    try {  
        const result = await db.query(
            `DELETE FROM todo 
            WHERE owner=?`, 
            [
              owner
            ]
          )
        res.send('todo deleted successfully')
    } catch (error) {
        res.status(400).send(error)
    }
})
    

module.exports = router