const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

// Create a new User
exports.createUser = async (req, res) => {
    try {
        const { fullname, businessName, email, phoneNumber, address, password } = req.body;

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
        });

        await UserModel.create(newUser);
        res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
        console.error('Error creating User:', error);
        res.status(500).json({ error: 'Failed to create User' });
    }
};
