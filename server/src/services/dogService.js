const dogDB = require("../models/Dogs")

const checkDogName = (dogname, dogId) => {
    return new Promise(async (resolve, resject) => {
      try {
        let isName = await dogDB.findOne({
          dogname: dogname
        });
        if (isName) {
            resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        resject(e);
      }
    });
  };

  const getAllDog = (dogQuery)=>{
    return new Promise(async (resolve, reject) => {
      try {
        let data=[]
        if(dogQuery.breedname){
          let dogs = await dogDB.find().populate('breedId', 'null', {'breedname': {$in: [dogQuery.breedname]}})
          dogs.forEach(dog => {
            if(dog.breedId !== null){
                data.push(dog)
            }
          });
        }else{
          data = await dogDB.find()
        }

        resolve({
          success:true,
          message:'get successfully',
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

  const getDog = (dogData)=>{
    return new Promise(async (resolve, reject) => {
      try {
        let data = await dogDB.findById(dogData.dogId)
        if(data === null){
          resolve({
            success:false,
            message:'Not found dog'
          })
        }else{
          resolve({
            success:true,
            message:'get successfully',
            data: data
          })
        }
        
      } catch (error) {
        reject(error)
      }
    })
  }

const createDog = (dogData) => {
    return new Promise(async (resolve, resject) => {
      try {
        let check = await checkDogName(dogData.name);
        if (!check) {
          let newdog = new dogDB(dogData)
          await newdog.save()
          resolve({
            success: true,
            message: "1 dog created successfully",
          });
        } else {
          resolve({
            success: false,
            message: "the title of the dog already exists",
          });
        }
      } catch (e) {
        resject(e);
      }
    });
  };

// const editDog = (dogData) =>{
//    return new Promise(async (resolve, reject) => {
//      try {
//       let check = await checkDogName(dogData.data.name);
//       if(!check){
//         const updateddog = await dogDB.findOneAndUpdate(dogData.id, { $set: dogData.data, }, {new: true})
//         if(!updateddog)
//           resolve({
//             ErrCode: 401,
//             success:false,
//             message: 'dog not found or user not authorised'
//           })
        
//         resolve({
//           ErrCode: 200,
//           success: true,
//           message: 'dog updated'
//         })
      
//       }else{
//         resolve({
//           ErrCode: 400,
//           success: false,
//           message: "the title of the dog already exists",
//         });
//       }
//      } catch (error) {
//        reject(error)
//      }
//    })
// }

// const deleteDog = (dogData)=>{
//   return new Promise(async (resolve, reject) => {
//     try {
//        const deleteddog = await dogDB.findOneAndDelete(dogData.id, {new: true})
//        if(!deleteddog)
//          resolve({
//            ErrCode: 401,
//            success:false,
//            message: 'dog not found or user not authorised'
//          })
       
//        resolve({
//          ErrCode: 200,
//          success: true,
//          message: 'dog deleted'
//        })
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

  module.exports = {
      createDog,
    //  editDog,
      getAllDog,
      getDog,
    //  deleteDog
  }