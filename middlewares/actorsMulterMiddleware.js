
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imagesUploads/actors');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadFile = multer(
    {storage: storage}
); 

module.exports = uploadFile;