const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

exports.getUsers = (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    res.json(users);
};

exports.createUser = (req, res) => {
    const newUser = req.body;

    try {
        // Read existing users from the file
        const users = JSON.parse(fs.readFileSync(usersFilePath));

        // Add the new user to the array
        users.push(newUser);

        // Write the updated user list back to the file
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteUsers = (req, res) => {
    try {
        // Write an empty array to the users.json file
        fs.writeFileSync(usersFilePath, '[]');
        res.status(200).send('All users deleted successfully');
    } catch (error) {
        res.status(500).send('Failed to delete users');
    }
};
