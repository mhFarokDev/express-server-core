const env = require('dotenv').config()
const express = require('express')
const app = express()

// get data from client config
app.use(express.json())
app.use(express.urlencoded({extended : false}))


// dotenv configuration
const PORT = process.env.APPLICATION_PORT;

// routers
app.use('/api/students', require('./routes/students.js'))

// listion server port and confirm message with port
app.listen(PORT, ()=>console.log(`Server In running on ${PORT} PORT`))