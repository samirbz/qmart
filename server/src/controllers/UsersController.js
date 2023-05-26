const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

// Create a new User
exports.createUser = async (req, res) => {
    try {
        const { fullname, businessName, email, phoneNumber, address, password } = req.body;

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
        res.status(201).json("Registered sucessfully");
    } catch (error) {
        console.error('Error creating User:', error);
        res.status(500).json({ error: 'Failed to create User' });
    }
};
