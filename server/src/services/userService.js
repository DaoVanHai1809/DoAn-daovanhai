const userDB = require("../models/User")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const { remove } = require("../models/User");
var salt = bcrypt.genSaltSync(10);

const checkUserEmail = (email) => {
    return new Promise(async (resolve, resject) => {
      try {
        let isEmail = await userDB.findOne({
          email: email
        });
        if (isEmail) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        resject(e);
      }
    });
  };

  const checkUserName = (username) => {
    return new Promise(async (resolve, resject) => {
      try {
        let isName = await userDB.findOne({
          username: username
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

  const checkPassword = (email) => {
    return new Promise(async (resolve, resject) => {
      try {
        let user = await userDB.findOne({
          email: email
        });
        if (user) {
          resolve(user);
        } else {
          resolve({});
        }
      } catch (e) {
        resject(e);
      }
    });
  };

const registerUser = (registerData) => {
    return new Promise(async (resolve, resject) => {
      try {
        let check = await checkUserEmail(registerData.email);
        if (!check) {
          let checkname = await checkUserName(registerData.username)
          if(!checkname){
            if(registerData.username.length <4 || registerData.username.length >20) {
              resolve({
                success: false,
                message: "username is too short or long",
              });
            }else{
                var hashedPasword = await bcrypt.hashSync(registerData.password, salt);
                const newUser = await userDB.create({
                  email: registerData.email,
                  username: registerData.username,
                  password: hashedPasword
                });
                resolve({
                  success: true,
                  message: "register successfully"
                });
              }
            
          }else{
            resolve({
              success: false,
              message: "username already exists",
            });
          }
        } else {
          resolve({
            success: false,
            message: "email already exists",
          });
        }
      } catch (e) {
        resject(e);
      }
    });
  };

const loginUser = (loginData) =>{
    return new Promise(async (resolve, resject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(loginData.email);
            // Username da dung
            let user = await checkPassword(loginData.email);
            if (isExist) {
              let result = await bcrypt.compareSync(loginData.password, user.password);
              // Pass dung
              if (result) {
                userData.success = true;
                userData.message = "Login successfully";
                const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
                userData.user = user;
                userData.accessToken = accessToken
                resolve(userData);
              } else {
                userData.success = false;
                userData.message = "Error password";
                resolve(userData);
              }
              resolve(userData);
            } else {
              userData.success = false;
              userData.message = "Erro email";
              resolve(userData);
            }
            resolve(userData);
          } catch (error) {
            resject(error);
          }
    })
}



  module.exports = {
      registerUser,
      loginUser,
      
  }