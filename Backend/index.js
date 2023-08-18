require("./db")
const express=require('express')
const cors=require('cors')
const app=express()
const port=5000;

//Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port,()=>{
    console.log('server working')
})