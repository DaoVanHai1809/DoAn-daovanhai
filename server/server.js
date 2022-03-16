const express = require('express')
require('dotenv').config()
const connectDB = require('./src/configs/connectDB');
const initWebRouter = require('./src/routes/web')


const app = express()
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000

connectDB()
initWebRouter(app)

app.listen(PORT, ()=>console.log(`server started on  http://localhost:${PORT}`))