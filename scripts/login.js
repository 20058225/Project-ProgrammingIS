// Helper function to get users from local storage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Helper function to save users to local storage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to add a user
function clickAddUser() {
    const username = document.getElementById('manageUsername').value;
    const password = document.getElementById('managePassword').value;
    let users = getUsers();
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert("User already exists!");
        return;
    }

    users.push({ username, password });
    saveUsers(users);
    alert(`User ${username} added successfully.`);
}

// Function to edit a user
function clickEditUser() {
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
function clickDeleteUser() {
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