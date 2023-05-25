const express = require('express');
const dbConnect = require('./src/config/dbConnect');
const cors = require('cors')
require('dotenv').config()
const productRoute = require('./src/routes/productRoutes');

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(cors())

const port = process.env.PORT;

// to access upload folder
app.use('/uploads', express.static('uploads'));



// Connect to MongoDB
dbConnect()

// Route
app.use('/product', productRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})