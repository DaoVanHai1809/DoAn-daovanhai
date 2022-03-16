const cateDB = require("../models/Category")

const checkCateName = (catename, cateid) => {

    return new Promise(async (resolve, resject) => {
      try {
        let isCateName = await cateDB.findOne({
          catename: catename
        })
        if (isCateName) {
          resolve(true)
        } else {
          resolve(false);
        }
      } catch (e) {
        resject(e);
      }
    });
  };

  const getAllCate = ()=>{
    return new Promise(async (resolve, reject) => {
      try {
        let data = await cateDB.find()
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

const createCate = (cateData) => {
    return new Promise(async (resolve, resject) => {
      try {
        let check = await checkCateName(cateData.catename);
        if (!check) {
          await cateDB.create({
            catename: cateData.catename
          });
          resolve({
            success: true,
            message: "1 category created successfully",
          });
        } else {
          resolve({
            success: false,
            message: "the name of the category already exists",
          });
        }
      } catch (e) {
        resject(e);
      }
    });
  };

  const editCate = (cateData) => {
    return new Promise(async (resolve, resject) => {
      try {
        let check = await checkCateName(cateData.data.catename);
        if(!check) {
          const updatedCate = await cateDB.findByIdAndUpdate(cateData.id, { $set: cateData.data, }, {new: true})

            if(!updatedCate)
            resolve({
              ErrCode: 401,
              success: false,
              message: 'Category not found'
            })
          
          resolve({
            ErrCode: 200,
            success: true,
            message: 'category updated'
          })
        } else {
          resolve({
            success: false,
            message: "the name of the category already exists",
          });
        }
      } catch (e) {
        resject(e);
      }
    });
  };

  const deleteCate = (cateid)=>{
    return new Promise(async (resolve, reject) => {
      try {
        
          const deletedPost = await cateDB.findByIdAndDelete(cateid, {new: true})
          if(!deletedPost)
            resolve({
              ErrCode: 401,
              success:false,
              message: 'This category not found'
            })
          
          resolve({
            ErrCode: 200,
            success: true,
            message: 'This category deleted'
          })
         
      } catch (error) {
        reject(error)
      }
    })
  }

  module.exports = {
    getAllCate,
    createCate,
    editCate,
    deleteCate
  }