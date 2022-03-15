const express = require('express')
require('dotenv').config()
const connectDB = require('./src/configs/connectDB');

const app = express()
const PORT = process.env.PORT || 5000
connectDB()

app.listen(PORT, ()=>console.log(`server started on  http://localhost:${PORT}`))