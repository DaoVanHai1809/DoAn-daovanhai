const express = require('express');
const userController = require('../controllers/userController')
const cateController= require('../controllers/cateController');


let router = express.Router();
let initWebRouter = (app) => {

    //auth
    // register - login
    router.post('/api/register', userController.userRegister)
    router.post('/api/login', userController.userLogin)

    // crud category
    router.get('/api/list-category', cateController.getAllCate)
    router.post("/api/create-category", cateController.createCate);
    router.put("/api/edit-category/:id", cateController.editCate);
    router.delete("/api/delete-category/:id", cateController.deleteCate);

    return app.use("/", router);
}

module.exports = initWebRouter