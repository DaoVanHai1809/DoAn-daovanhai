const userService = require('../services/userService')

const userRegister = async (req, res) => {
    const registerData = req.body;
    if (!registerData.email || !registerData.password) {
        return res.status(500).json({
            success: false,
            message: 'missing user email and/or password'
        });
    } else {
        const data = await userService.registerUser(registerData);
        return res.status(200).json({
            success:data.success,
            message:data.message,
            accessToken: data.accessToken
        });
    }
};

const userLogin = async (req, res) => {
    const loginData = req.body;
    if (!loginData.email || !loginData.password) {
        return res.status(500).json({
            success: false,
            message: 'missing user email and/or password'
        });
    } else {
        const data = await userService.loginUser(loginData);
        return res.status(200).json({
            success:data.success,
            message:data.message,
            data: data.user,
            accessToken: data.accessToken
        });
    }
};

module.exports = {
    userRegister,
    userLogin
}