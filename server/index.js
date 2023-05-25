const express = require('express');
const dbConnect = require('./src/config/dbConnect');
const multer = require('multer');
const cors = require('cors')
require('dotenv').config()
const productRoute = require('./src/routes/productRoutes');

const app = express()
app.use(express.json());
app.use(cors())

const port = process.env.PORT;

// Serve static files from the "uploads" folder
app.use('/uploads', express.static('uploads'));



// Connect to MongoDB
dbConnect()

// Route
app.use('/product', productRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})