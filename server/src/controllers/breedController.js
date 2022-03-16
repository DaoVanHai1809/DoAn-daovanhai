const breedService = require('../services/breedService')

const getAllBreed = async (req, res) =>{
    const data = await breedService.getAllBreed()
    return res.status(200).json({
        success: data.success,
        message: data.message,
        data: data.data
    });
}

const createBreed = async (req, res) => {
    const breedData = req.body;
    if (!breedData.breedname) {
        return res.status(500).json({
            success: false,
            message: 'missing breed name'
        });
    } else {
        const data = await breedService.createBreed(breedData);
        return res.status(200).json({
            success:data.success,
            message:data.message
        });
    }
};

const editBreed = async (req, res) => {
    if (!req.body.breedname) {
        return res.status(500).json({
            success: false,
            message: 'missing breed name'
        });
    } else {
        const breedData = []
        breedData.id = req.params.id
        breedData.data = req.body
        const data = await breedService.editBreed(breedData);
        return res.status(200).json({
            success:data.success,
            message:data.message,
            data: data.data
        });
    }
};

const deleteBreed = async (req, res) =>{
    const breedid = req.params.id
    let data = await breedService.deleteBreed(breedid);
    return res.status(data.ErrCode).json({
        success:data.success,
        message:data.message,
        data: data.data
    });
}

module.exports = {
    getAllBreed,
    createBreed,
    editBreed,
    deleteBreed
}