const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imagesUploads/movies');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploadFile = multer(
    {storage: storage}
   /*  fileFilter: (req, file, cb) => {
        if(file.mimetype != 'image/png' || file.mimetype != 'image/jpg') {
            console.log('Only JPG and PNG files accepted');
            cb(null, false)
        } else {
            cb(null, true)
        } */
); 

module.exports = uploadFile;