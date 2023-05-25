const multer = require('multer');


// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where you want to save the uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Set the file name to be the original name of the uploaded file
        cb(null, file.originalname);
    }
});

// Create multer middleware with the specified storage configuration
const upload = multer({ storage });

module.exports = upload;