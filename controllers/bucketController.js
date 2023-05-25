const { request, response } = require('express');
const multer = require('multer');
const Tradutor = require('../tradutor');
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports.saveToMemory = (request, response) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    upload.single('image');
    next();
}

module.exports.uploadToCloudinary = async (request, response) => {
    try {
        const fileData = request.file.buffer;
        const uploadResult = await cloudinary.uploader.upload(fileData);
        request.cloudinary = uploadResult;
        request.file.buffer = null;
        next();
    } catch (error) {
        request.file.buffer = null;
        console.log(error);
        response.status(500).send({message: Tradutor.t('error'), status: 500});
    }
}

module.exports.saveToDatabase = async (request, response) => {
    try {
        const imageData = request.cloudinary;
        const result = await dbSaveImageData(imageData);
        response
            .status(result.status)
            .send({ message: result.message, data: result.imageData, status: result.status });
    } catch (error) {
        console.log(error);
        response.status(500).send({message: Tradutor.t('error'), status: 500});
    }
}