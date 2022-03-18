const express = require('express');
const userController = require('../controllers/userController')
const cateController= require('../controllers/cateController');
const breedController= require('../controllers/breedController');
const dogController= require('../controllers/dogController');

const verifyToken = require('../middlewares/auth')


let router = express.Router();
let initWebRouter = (app) => {

    //auth
    // register - login
    router.post('/api/register', userController.userRegister)
    router.post('/api/login', userController.userLogin)

    // crud category
    router.get('/api/list-category', verifyToken, cateController.getAllCate)
    router.post("/api/create-category", verifyToken, cateController.createCate);
    router.put("/api/edit-category/:id", verifyToken, cateController.editCate);
    router.delete("/api/delete-category/:id", verifyToken, cateController.deleteCate);

    //crud dogBreeds
    router.get('/api/list-breed_dog', breedController.getAllBreed)
    router.post("/api/create-breed_dog", breedController.createBreed);
    router.put("/api/edit-breed_dog/:id", breedController.editBreed);
    router.delete("/api/delete-breed_dog/:id", breedController.deleteBreed);

    //crud dogs
    router.get('/api/list-dog', dogController.getAllDog)
    router.get('/api/get-dog/:id', dogController.getDog)
    router.post("/api/create-dog", dogController.createDog);
    router.put("/api/edit-dog/:id", dogController.editDog);
    router.delete("/api/delete-dog/:id", dogController.deleteDog);


    return app.use("/", router);
}

module.exports = initWebRouter
