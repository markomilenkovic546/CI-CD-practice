// userModel.test.js
const UserModel = require('../models/userModel');

describe('UserModel', () => {
  beforeEach(() => {
    // Clear users array before each test
    UserModel.users = [];
  });

  test('createUser adds a new user to the users array', () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    UserModel.createUser(newUser);

    expect(UserModel.users.length).toBe(1);
    expect(UserModel.users[0]).toEqual(newUser);
  });

  test('createUser throws an error if username is missing', () => {
    const newUser = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    expect(() => UserModel.createUser(newUser)).toThrow('Invalid user data');
    expect(UserModel.users.length).toBe(0);
  });

  test('createUser throws an error if email is missing', () => {
    const newUser = {
      username: 'testuser',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    expect(() => UserModel.createUser(newUser)).toThrow('Invalid user data');
    expect(UserModel.users.length).toBe(0);
  });

 
});
