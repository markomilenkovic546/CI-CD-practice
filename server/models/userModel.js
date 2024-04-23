const fs = require('fs');
const Ajv = require('ajv');

// Define the user schema
const userSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "integer" },
        "username": { "type": "string" },
        "email": { "type": "string", "format": "email" },
        "password": { "type": "string" },
        "firstName": { "type": "string" },
        "lastName": { "type": "string" }
    },
    "required": ["username", "email", "password"]
};
// Create an instance of Ajv
const ajv = new Ajv();

// Define a custom format for email validation
ajv.addFormat('email', {
    type: 'string',
    format: 'email',
    validate: (email) => {
        // Use a regular expression to validate email format
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});

class UserModel {
    constructor() {
        this.users = [];
    }

    getUsers() {
        return this.users;
    }

    createUser(newUser) {
        // Validate user data against the schema
        const isValid = ajv.validate(userSchema, newUser);
        if (!isValid) {
            throw new Error('Invalid user data');
        }

        this.users.push(newUser);
        this.saveUsersToFile();
    }

    saveUsersToFile() {
        fs.writeFileSync('./data/users.json', JSON.stringify(this.users));
    }
}

module.exports = new UserModel();
