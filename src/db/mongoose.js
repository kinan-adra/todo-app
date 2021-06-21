const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log('connected to MongoDB...')
}).catch(()=> {
    console.log('Error in connecting to MongoDB')
})