const express = require('express');
const userController = require('../controllers/userController')


let router = express.Router();
let initWebRouter = (app) => {

    //auth
    // register - login
    router.post('/api/register', userController.userRegister)
    router.post('/api/login', userController.userLogin)

    return app.use("/", router);
}

module.exports = initWebRouter