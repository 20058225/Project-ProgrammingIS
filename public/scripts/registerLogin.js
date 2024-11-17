// Load users from the .users.json file
async function loadUsers() {
    const response = await fetch('./data/users.json');
    const users = await response.json();
    localStorage.setItem('users', JSON.stringify(users)); // Sync with localStorage
}

// Helper function to get users from local storage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Helper function to save users to .users.json
async function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users)); // Sync to localStorage
    
    // Save to .users.json (mocked via API/Server - depends on your environment)
    await fetch('./data/users.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
    });
}

// Function to display feedback messages in the DOM
function displayMessage(message, type) {
    const messageBox = document.getElementById('messageBox');
    messageBox.innerText = message;
    messageBox.style.color = type === 'success' ? 'green' : 'red';

    // Clear the message after 3 seconds
    setTimeout(() => {
        messageBox.innerText = '';
    }, 3000);
}

// Function to add a user
async function handleAddUser() {
    const username = document.getElementById('manageUsername').value.trim();
    const password = document.getElementById('managePassword').value.trim();

    if (!username || !password) {
        displayMessage("Both username and password are required.", 'error');
        return;
    }

    let users = getUsers();
    const userExists = users.some(user => user.username.toLowerCase() === username.toLowerCase());

    if (userExists) {
        displayMessage("User already exists!", 'error');
        return;
    }

    users.push({ username, password });
    await saveUsers(users);
    displayMessage(`User ${username} added successfully.`, 'success');
    document.getElementById('manageUsername').value = '';
    document.getElementById('managePassword').value = '';
}

// Function to edit a user
async function handleEditUser() {
    const username = document.getElementById('manageUsername').value.trim();
    const password = document.getElementById('managePassword').value.trim();

    if (!username || !password) {
        displayMessage("Both username and password are required.", 'error');
        return;
    }

    let users = getUsers();
    const userIndex = users.findIndex(user => user.username.toLowerCase() === username.toLowerCase());

    if (userIndex === -1) {
        displayMessage("User not found.", 'error');
        return;
    }

    users[userIndex].password = password;
    await saveUsers(users);
    displayMessage(`User ${username} updated successfully.`, 'success');
    document.getElementById('manageUsername').value = '';
    document.getElementById('managePassword').value = '';
}

// Function to delete a user
async function handleDeleteUser() {
    const username = document.getElementById('manageUsername').value.trim();

    if (!username) {
        displayMessage("Username is required to delete a user.", 'error');
        return;
    }

    let users = getUsers();
    const initialLength = users.length;
    users = users.filter(user => user.username.toLowerCase() !== username.toLowerCase());

    if (users.length === initialLength) {
        displayMessage("User not found.", 'error');
    } else {
        await saveUsers(users);
        displayMessage(`User ${username} deleted successfully.`, 'success');
    }

    document.getElementById('manageUsername').value = '';
    document.getElementById('managePassword').value = '';
}

// Function to validate login
function clickLogin() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!username || !password) {
        displayMessage("Both username and password are required.", 'error');
        return;
    }

    const users = getUsers();
    const user = users.find(user => user.username.toLowerCase() === username.toLowerCase() && user.password === password);

    if (user) {
        displayMessage("Login successful.", 'success');
        // Redirect to pos.html
        window.location.href = "pos.html";
        return true;
    } else {
        displayMessage("Invalid username or password.", 'error');
        return false;
    }

    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

// Initialize users from JSON on page load
loadUsers();