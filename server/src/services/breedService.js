const breedDB = require("../models/DogBreeds")

const checkbreedName = (breedname, breedid) => {

    return new Promise(async (resolve, resject) => {
      try {
        let isbreedName = await breedDB.findOne({
          breedname: breedname
        })
        if (isbreedName) {
          resolve(true)
        } else {
          resolve(false);
        }
      } catch (e) {
        resject(e);
      }
    });
  };

  const getAllBreed = ()=>{
    return new Promise(async (resolve, reject) => {
      try {
        let data = await breedDB.find()
          resolve({
            success: true,
            message: 'get successfully',
            data: data
          })
        
      } catch (error) {
        resolve({
          success:false,
          message: 'Internal server error'
        })
      }
    })
  }

const createBreed = (breedData) => {
    return new Promise(async (resolve, resject) => {
      try {
        let check = await checkbreedName(breedData.breedname);
        if (!check) {
          await breedDB.create({
            breedname: breedData.breedname
          });
          resolve({
            success: true,
            message: "1 dog breed created successfully",
          });
        } else {
          resolve({
            success: false,
            message: "the name of the dog breed already exists",
          });
        }
      } catch (e) {
        resject(e);
      }
    });
  };

  const editBreed = (breedData) => {
    return new Promise(async (resolve, resject) => {
      try {
        let check = await checkbreedName(breedData.data.breedname);
        if(!check) {
          const updatedbreed = await breedDB.findByIdAndUpdate(breedData.id, { $set: breedData.data, }, {new: true})

            if(!updatedbreed)
            resolve({
              ErrCode: 401,
              success: false,
              message: 'breed not found'
            })
          
          resolve({
            ErrCode: 200,
            success: true,
            message: 'breed updated'
          })
        } else {
          resolve({
            success: false,
            message: "the name of the dog breed already exists",
          });
        }
      } catch (e) {
        resject(e);
      }
    });
  };

  const deleteBreed = (breedid)=>{
    return new Promise(async (resolve, reject) => {
      try {
        
          const deletedPost = await breedDB.findByIdAndDelete(breedid, {new: true})
          if(!deletedPost)
            resolve({
              ErrCode: 401,
              success:false,
              message: 'This breed not found'
            })
          
          resolve({
            ErrCode: 200,
            success: true,
            message: 'This breed deleted'
          })
         
      } catch (error) {
        reject(error)
      }
    })
  }

  module.exports = {
    getAllBreed,
    createBreed,
    editBreed,
    deleteBreed
  }