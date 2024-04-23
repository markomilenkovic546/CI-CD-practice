import { getUsers, createUser } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const userList = document.getElementById('user-list');
  const openModalButton = document.getElementById('open-modal');
  const closeModalButton = document.getElementById('close-modal');
  const createUserForm = document.getElementById('create-user-form');

  // Function to fetch users from the API and render them in the user list
  async function fetchUsers() {
    try {
      const users = await getUsers();
      renderUsers(users);
    } catch (error) {
      console.error(error);
      toastr.error('Failed to fetch users');
    }
  }

  // Function to render users in the user list
  function renderUsers(users) {
    userList.innerHTML = '';
    users.forEach(user => {
      const userItem = document.createElement('li');
      userItem.innerHTML = `
        <div class="user-info">
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>First Name:</strong> ${user.firstName}</p>
          <p><strong>Last Name:</strong> ${user.lastName}</p>
        </div>
      `;
      userList.appendChild(userItem);
    });
  }

  // Event listener for opening the create user modal
  openModalButton.addEventListener('click', () => {
    document.getElementById('create-user-modal').style.display = 'block';
  });

  // Event listener for closing the create user modal
  closeModalButton.addEventListener('click', () => {
    document.getElementById('create-user-modal').style.display = 'none';
  });

  // Event listener for form submission to create a new user
  createUserForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    try {
      // Form validation
      if (!validateForm(userData)) {
        toastr.error('Please correct the form errors');
        return;
      }
      await createUser(userData);
      toastr.success('User created successfully');
      fetchUsers();
      closeModalButton.click(); // Close modal after successful submission
      createUserForm.reset(); // Clear form fields
    } catch (error) {
      console.error(error);
      toastr.error('Failed to create user');
    }
  });

  // Function to validate form data
  function validateForm(userData) {
    const { username, email, password, firstName, lastName } = userData;

    // Username validation
    if (username.length < 2 || username.length > 10) {
      toastr.error('Username must be between 2 and 10 characters long');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toastr.error('Invalid email format');
      return false;
    }

    // First name validation
    if (firstName.length < 2 || firstName.length > 20 || !/^[A-Z][a-z]*$/.test(firstName)) {
      toastr.error('First name must start with a capital letter and be between 2 and 20 characters long');
      return false;
    }

    // Last name validation
    if (lastName.length < 2 || lastName.length > 20 || !/^[A-Z][a-z]*$/.test(lastName)) {
      toastr.error('Last name must start with a capital letter and be between 2 and 20 characters long');
      return false;
    }

    // Password validation
    if (password.length < 6 || password.length > 30) {
      toastr.error('Password must be between 6 and 30 characters long');
      return false;
    }

    return true; // Form data is valid
  }

  // Initial fetch of users
  fetchUsers();
});
