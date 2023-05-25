const multer = require('multer');

// storage setup of file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // directory path to save image
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // unique name
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
        // get file extension
        const fileExtension = file.originalname.split('.').pop();
        // unique file name generation
        const uniqueFileName = `${uniqueId}.${fileExtension}`;
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage });

module.exports = upload;
