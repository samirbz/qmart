const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken')


// Create a new User
exports.registerUser = async (req, res) => {
    try {
        const { fullname, businessName, email, phoneNumber, address, password, role } = req.body;
        // Check if the phone number already exists
        const existingUser = await UserModel.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            fullname,
            businessName,
            email,
            phoneNumber,
            address,
            password: hashedPassword, // Store the hashed password in the database
            role,
        });
        await UserModel.create(newUser);
        res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
        console.error('Error creating User:', error);
        res.status(500).json({ error: 'Failed to create User' });
    }
};

// Login Users
exports.loginUser = async (req, res) => {

    const { phoneNumber, password, businessName } = req.body;
    // Check if the user exists with the provided phone number
    const user = await UserModel.findOne({ phoneNumber });
 
    if (user) {
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (isPasswordValid) {
            // If the phone number and password are valid, generate a JWT token
            const token = jwt.sign({ phoneNumber: phoneNumber }, process.env.SECRET_KEY);
            //send any data you need from database so you can access from frontend and can use in redux
            res.json({ message: "Login Succcess", success: true, token: token, role: user.role, id: user._id, fullname: user.fullname, phoneNumber: user.phoneNumber, businessName: user.businessName })

        } else {
            res.json({ message: "Login Failed", success: false })
        }
    } else {
        res.json({ message: "user does not exist", success: false })
    }
}
