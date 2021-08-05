import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import todosRoutes from './routes/todos.js';

const app = express()
dotenv.config()
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/todos', todosRoutes)
const mongodb = 'mongodb://ckmobile:ckmobile123@cluster0-shard-00-00.kbtur.mongodb.net:27017,cluster0-shard-00-01.kbtur.mongodb.net:27017,cluster0-shard-00-02.kbtur.mongodb.net:27017/todos-database?ssl=true&replicaSet=atlas-e5jvv9-shard-0&authSource=admin&retryWrites=true&w=majority'
app.get('/', (req, res)=>{
    res.send('Welcome to server')
})
const PORT =process.env.PORT || 5000;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(()=>app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))
).catch((err)=>console.log(err))