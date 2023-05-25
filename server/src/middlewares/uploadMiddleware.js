const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where you want to save the uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generate a unique identifier (e.g., timestamp + random string)
        const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
        // // Get the file extension from the original file name
        const fileExtension = file.originalname.split('.').pop();
        // // Construct the unique file name by combining the unique identifier and file extension
        const uniqueFileName = `${uniqueId}.${fileExtension}`;
        cb(null, uniqueFileName);
    }
});

// Create multer middleware with the specified storage configuration
const upload = multer({ storage });

module.exports = upload;
