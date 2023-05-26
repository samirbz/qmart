const UserModel = require('../models/User');

// Create a new User
exports.createUser = async (req, res) => {
    try {
        const { fullname, businessName, email, phoneNumber, address, password } = req.body;

        const newUser = new UserModel({
            fullname,
            businessName,
            email,
            phoneNumber,
            address,
            password
        });

        const savedUser = await UserModel.create(newUser);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating User:', error);
        res.status(500).json({ error: 'Failed to create User' });
    }
};
