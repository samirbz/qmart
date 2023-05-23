const express = require('express');
const dbConnect = require('./config/dbConnect');
const cors = require('cors')
require('dotenv').config()
const productRoute = require('./routes/productRoutes');


const app = express()
app.use(cors())
const port = process.env.PORT;

// Connect to MongoDB
dbConnect()

// Middleware
app.use(express.json());

// Routes (=>routes=>controller=>models)
app.use('/product', productRoute)
app.use('/', productRoute)

// Start the server
app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})