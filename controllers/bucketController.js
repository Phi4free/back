const multer = require('multer');
const cloudinary = require('cloudinary').v2

module.exports.saveToMemory = (request, response) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    upload.single('image');
    next();
}