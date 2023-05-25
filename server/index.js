const express = require('express');
const dbConnect = require('./config/dbConnect');
const multer = require('multer');
const cors = require('cors')
require('dotenv').config()
const productRoute = require('./routes/productRoutes');

const app = express()
app.use(express.json());
app.use(cors())


const port = process.env.PORT;

// Connect to MongoDB
dbConnect()

// Route
app.use('/product', productRoute)



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

// Define a route to handle the file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
    // Access the uploaded file details using req.file
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Perform additional operations with the uploaded file if needed
    // For example, you can save the file details to a database

    // Return a success response
    res.json({ message: 'File uploaded successfully' });
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})