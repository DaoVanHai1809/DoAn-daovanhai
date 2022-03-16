const cateService = require('../services/cateService')

const getAllCate = async (req, res) =>{
    const data = await cateService.getAllCate()
    return res.status(200).json({
        success: data.success,
        message: data.message,
        data: data.data
    });
}

const createCate = async (req, res) => {
    const cateData = req.body;
    if (!cateData.catename) {
        return res.status(500).json({
            success: false,
            message: 'missing category name'
        });
    } else {
        const data = await cateService.createCate(cateData);
        return res.status(200).json({
            success:data.success,
            message:data.message
        });
    }
};

const editCate = async (req, res) => {
    if (!req.body.catename) {
        return res.status(500).json({
            success: false,
            message: 'missing category name'
        });
    } else {
        const cateData = []
        cateData.id = req.params.id
        cateData.data = req.body
        const data = await cateService.editCate(cateData);
        return res.status(200).json({
            success:data.success,
            message:data.message,
            data: data.data
        });
    }
};

const deleteCate = async (req, res) =>{
    const cateid = req.params.id
    let data = await cateService.deleteCate(cateid);
    return res.status(data.ErrCode).json({
        success:data.success,
        message:data.message,
        data: data.data
    });
}

module.exports = {
    getAllCate,
    createCate,
    editCate,
    deleteCate
}