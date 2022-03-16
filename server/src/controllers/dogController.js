const dogService = require('../services/dogService')


const getAllDog = async (req, res) =>{
    const dogQuery = []
    dogQuery.breedname = req.query.breedname
    const data = await dogService.getAllDog(dogQuery)
    return res.status(200).json({
        success:data.success,
        message:data.message,
        data: data.data
    });
}

const getDog = async (req, res) =>{
    const dogData = []
    dogData.dogId = req.params.id
    const data = await dogService.getDog(dogData)
    return res.status(200).json({
        success:data.success,
        message:data.message,
        data: data.data
    });
}

const createDog = async (req, res) => {
    const dogData = req.body;
    if (!dogData.dogname) {
        return res.status(500).json({
            success: false,
            message: 'missing dog name'
        });
    } else {
        const data = await dogService.createDog(dogData);
        return res.status(200).json({
            success:data.success,
            message:data.message
        });
    }
};

const editDog = async (req, res)=>{
    if(!req.body.dogname){
        return res.status(500).json({
            success: false,
            message: 'missing dog name'
        });
    }else{
        const dogData = []
        dogData.id = req.params.id
        dogData.data = req.body
        let data = await dogService.editDog(dogData);
        return res.status(data.ErrCode).json({
            success:data.success,
            message:data.message,
            data: data.data
        });
    }
}

const deleteDog = async (req, res) =>{
    const dogData = []
    dogData.id = req.params.id
    let data = await dogService.deleteDog(dogData);
    return res.status(data.ErrCode).json({
        success:data.success,
        message:data.message,
        data: data.data
    });
}



module.exports = {
    createDog,
    editDog,
    getAllDog,
    getDog,
    deleteDog
}