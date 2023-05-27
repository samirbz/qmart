const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');


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
    try {
        const { phoneNumber, password } = req.body;
        // Check if the user exists with the provided phone number
        const user = await UserModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(401).json({ error: 'Invalid phone number or password' });
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid phone number or password' });
        }
        // If the phone number and password are valid, generate a JWT token
        const token = jwt.sign({ phoneNumber: phoneNumber }, process.env.SECRET_KEY);
        // Set the token as a cookie or send it in the response header
        res.cookie('token', token, { httpOnly: true });
        // Redirect to the login page or send a success message
        // res.redirect('/profile/user');
        res.status(200).json({ message: 'Login successfull' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};
