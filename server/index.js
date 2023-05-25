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

// Start the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})