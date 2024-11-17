// Helper function to get users from local storage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users to the server via API
async function saveUsers(users) {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(users), // Send the user list to the server
        });

        if (!response.ok) {
            throw new Error('Failed to save users on the server');
        }

        const message = await response.text();
        console.log(message); // Log server response
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

async function handleAddUser() {
    const username = document.getElementById('manageUsername').value.trim();
    const password = document.getElementById('managePassword').value.trim();

    if (!username || !password) {
        displayMessage("Both username and password are required.", 'error');
        return;
    }

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to add user');
        }

        const message = await response.text();
        displayMessage(message, 'success');
        loadUsers(); // Reload users after successful addition
    } catch (error) {
        displayMessage(error.message, 'error');
    }
}


// Function to edit a user
function handleEditUser() {
    const username = document.getElementById('manageUsername').value;
    const password = document.getElementById('managePassword').value;
    let users = getUsers();
    const userIndex = users.findIndex(user => user.username === username);

    if (userIndex === -1) {
        alert("User not found.");
        return;
    }

    users[userIndex].password = password;
    saveUsers(users);
    alert(`User ${username} updated successfully.`);
}

// Function to delete a user
function handleDeleteUser() {
    const username = document.getElementById('manageUsername').value;
    let users = getUsers();
    users = users.filter(user => user.username !== username);

    saveUsers(users);
    alert(`User ${username} deleted successfully.`);
}

// Function to validate login
function clickLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful.");
    } else {
        alert("Invalid username or password.");
    }
}