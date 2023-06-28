const express=require('express')
const dotenv=require('dotenv').config()

const app= express()
const authRouter=require('./routes/authRoutes')
const port=process.env.PORT || 3001
const bodyParser=require('body-parser')
const connectDb=require('./config/dbConnect')
const { notFound,errorHandler } = require('./middlewares/errorHandler')
connectDb()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/api/auth',authRouter)
app.use(notFound)
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server Listen to the PORT ${port}`)
})