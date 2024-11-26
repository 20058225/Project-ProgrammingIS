// @@ Handle Register
const addUser = async ({ username, email, password, passwordConf }) => {
    try {
        // Check if passwords match
        if (password !== passwordConf) {
            showSnackbar('Passwords do not match!');
            return;
        }
        // Make a request to the backend API to add a user
        const response = await fetch('/addUser', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) { const errorText = await response.text(); throw new Error(errorText); }
        
        const data = await response.text();
        showSnackbar(data); // Display success message
        cleanInput();
    } catch (error) {
        console.error('Error adding user:', error);
        showSnackbar('Error adding user: ' + error.message);
    }
};
// @@ Handle form submission
const addUserForm = document.getElementById('addUserForm');
addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('manageUsername').value;
    const email = document.getElementById('manageUseremail').value;
    const password = document.getElementById('managePassword').value;
    const passwordConf = document.getElementById('managePasswordConf').value;

    addUser({ username, email, password, passwordConf });
});

// @@ Handle update user
const updateUser = async ({ id, username, email, password } = {}) => {
    const updates = {};
    if (username) updates.userFullName = username;
    if (email) updates.userEmail = email;
    if (password) updates.userPassword = password;

    // Check if there are any updates to send
    if (Object.keys(updates).length === 0) {
        showSnackbar('No fields to update.');
        return;
    }

    try {
        const response = await fetch(`/updateUser/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });

        if (!response.ok) throw new Error(await response.text());

        showSnackbar('User updated successfully'); // Success message
    } catch (error) {
        console.error('Error updating user:', error);
        showSnackbar('Failed to update user: ' + error.message);
    }
};
// @@ Attach event listener to the update form
document.getElementById('updateUserForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('updateUserId').value;
    const username = document.getElementById('updateUsername').value;
    const email = document.getElementById('updateEmail').value;
    const password = document.getElementById('updatePassword').value;

    updateUser({ id, username, email, password });
});

// Function to delete user
const deleteUser = async () => {
    const userId = document.getElementById('updateUserId').value;
    if (!userId) { showSnackbar('User ID is required for deletion'); return; }

    if (!confirm('Are you sure you want to delete this user?')) { return; }

    try {
        const response = await fetch(`/deleteUser/${userId}`, 
            { method: 'DELETE' });

        if (!response.ok) { const errorText = await response.text(); throw new Error(errorText); }

        const successMessage = await response.text();
        showSnackbar(successMessage);
        closeForm();
    } catch (error) {
        console.error('Error deleting user:', error);
        showSnackbar('Error deleting user: ' + error.message);
    }
};
// Function to open edit form and populate it with user data
const openForm = (user) => {
    document.getElementById('updateUserId').value = user.userID;
    document.getElementById('updateUsername').value = user.userFullName;
    document.getElementById('updateEmail').value = user.userEmail;
    document.getElementById('updatePassword').value = ''; // For security, don't populate password
    document.getElementById('editFormContainer').style.display = 'block';
};
// Function to handle user search
const searchUser = async () => {
    const searchId = document.getElementById('searchUserID').value;
    const searchName = document.getElementById('searchFullName').value;

    if (!searchId && !searchName) {
        showSnackbar('Please enter a User ID or Full Name to search.');
        return;
    }

    try {
        const response = await fetch('/searchUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: searchId, fullName: searchName }),
        });

        if (!response.ok) throw new Error('Search failed');

        const users = await response.json();
        displaySearchResults(users);
    } catch (error) {
        console.error('Error searching users:', error);
        showSnackbar('Error searching users: ' + error.message);
    }
};
// Function to display search results
const displaySearchResults = (users) => {
    const resultDiv = document.getElementById('searchResult');
    resultDiv.innerHTML = '';
    if (users.length === 0) {
        resultDiv.innerHTML = '<p>No users found.</p>';
        return;
    }
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <p>ID: ${user.userID}, Name: ${user.userFullName}, Email: ${user.userEmail}</p>
            <button onclick='openForm(${JSON.stringify(user)})'>Edit</button>
        `;
        resultDiv.appendChild(userDiv);
    });
};