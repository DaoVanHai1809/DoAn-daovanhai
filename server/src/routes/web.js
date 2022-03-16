const express = require('express');
const userController = require('../controllers/userController')
const cateController= require('../controllers/cateController');
const breedController= require('../controllers/breedController');


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

    //crud dogBreeds
    router.get('/api/list-breed_dog', breedController.getAllBreed)
    router.post("/api/create-breed_dog", breedController.createBreed);
    router.put("/api/edit-breed_dog/:id", breedController.editBreed);
    router.delete("/api/delete-breed_dog/:id", breedController.deleteBreed);

    return app.use("/", router);
}

module.exports = initWebRouter