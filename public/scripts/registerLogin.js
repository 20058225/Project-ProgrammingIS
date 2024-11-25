// Load users from the .users.json file
async function loadUsers() {
    try {
        const response = await fetch('./data/users.json');
        let users = await response.json();

        // Flatten and sanitize the users array
        users = Array.isArray(users) ? users.flat().filter(user => user && user.email) : [];

        localStorage.setItem('users', JSON.stringify(users));
        console.log('Users loaded successfully:', users);
    } catch (error) {
        console.error('Error loading users:', error);
        localStorage.setItem('users', JSON.stringify([])); // Initialize with an empty array
    }
}
// Fetch users from the JSON file
async function getUsers() {
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) {
        try {
            const users = JSON.parse(cachedUsers).filter(user => user && user.email);
            return users;
        } catch {
            console.warn('Corrupted localStorage. Resetting...');
            localStorage.setItem('users', JSON.stringify([]));
            return [];
        }
    }

    try {
        const response = await fetch('./data/users.json');
        const users = (await response.json()).flat().filter(user => user && user.email);
        //localStorage.setItem('users', JSON.stringify(users)); // Cache the result
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}    
async function saveChanges() {
    const updatedName = document.getElementById('editName').value.trim();
    const updatedEmail = document.getElementById('editEmail').value.trim();
    const originalEmail = document.getElementById('editEmail').getAttribute('data-original-email');

    // Validate input fields
    if (!updatedName || !updatedEmail) {
        showSnackbar("Please fill in all fields.", "error", "snackbarId");
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedEmail)) {
        showSnackbar("Invalid email format.", "error", "snackbarId");
        return;
    }

    try {
        let users = await getUsers();

        // Check for duplicate email if email is updated
        if (updatedEmail !== originalEmail) {
            const duplicateUser = users.find(user => user.email === updatedEmail);
            if (duplicateUser) {
                showSnackbar("Email already in use by another user.", "error", "snackbarId");
                return;
            }
        }

        // Find the user by their original email
        const userIndex = users.findIndex(user => user.email === originalEmail);

        if (userIndex !== -1) {
            // Update the user's details
            users[userIndex].fullname = updatedName;
            users[userIndex].email = updatedEmail;

            // Save changes to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            console.log('Saving changes:', { updatedName, updatedEmail });
            showSnackbar("User updated successfully.", "success", "snackbarId");

            // Refresh the UI and close the edit form
            searchUsers();
            document.getElementById('editFormContainer').style.display = 'none';
        } else {
            showSnackbar("User not found.", "error", "snackbarId");
        }
    } catch (error) {
        console.error('Error in saveChanges:', error);
        showSnackbar("An error occurred while saving changes.", "error", "snackbarId");
    }
}

// Helper function to save users to .users.json
async function saveUsers(users) {
    try {
        // Flatten the array and remove invalid entries
        users = users.flat().filter(user => user && user.email);

        // Optional: Save to server
        const response = await fetch('http://localhost:3000/data/users.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(users),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Users saved successfully:', users);
    } catch (error) {
        console.error('Error saving users:', error);
    }
}
async function addUser() { //@@ Function to add a user
    const fullname = document.getElementById('nameRegister').value.trim();
    const email = document.getElementById('usernameRegister').value.trim();
    const password = document.getElementById('pwdRegister').value.trim();
    const passwordConf = document.getElementById('pwdRegisterConfirm').value.trim();

    if (!fullname || !email || !password || !passwordConf) {
        showSnackbar("All fields are required.", 'error', 'snackbarId');
        return;
    }
    if (password !== passwordConf) {
        showSnackbar("Passwords do not match.", 'error', 'snackbarId');
        return;
    }    
    if(password.length < 8){
        showSnackbar("Passwords need to have more than 8 characters.", 'error', 'snackbarId');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showSnackbar("Invalid email format.", 'error', 'snackbarId');
        return;
    }    
    try {
        let users = await getUsers(); // Await the result of getUsers
        users = users.filter(user => user && user.email); // Filter valid users

        const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

        if (emailExists) {
            showSnackbar("Email already registered.", 'error', 'snackbarId');
            return;
        }

        // Generate unique user ID (increment by 5)
        const lastUser = users[users.length - 1] || { id: "0000" };
        const newId = String(parseInt(lastUser.id) + 5).padStart(4, '0');

        const newUser = {
            id: newId,
            fullname,
            email,
            password
        };        

        users.push(newUser);
        await saveUsers(users); // Save updated users list
        showSnackbar(`User ${fullname} registered successfully.`, 'success', 'snackbarId');
    } catch (error) {
        showSnackbar('Failed to register user.', 'error', 'snackbarId');
        console.error('Error in addUser:', error);
    }

    // Clear input fields
    document.getElementById('nameRegister').value = '';
    document.getElementById('usernameRegister').value = '';
    document.getElementById('pwdRegister').value = '';
    document.getElementById('pwdRegisterConfirm').value = '';
}
document.addEventListener("DOMContentLoaded", function() {
// Initialize users from JSON on page load
    loadUsers();
});

function showSnackbar(message, type, snackbarId = 'snackbar') {
    createSnackbar(snackbarId); // Ensure snackbar exists
    const snackbar = document.getElementById(snackbarId);
    snackbar.innerHTML = message;
    snackbar.style.backgroundColor = type === 'success' ? '#2ECC71' : '#E74C3C';
    snackbar.classList.add('show');
    setTimeout(() => snackbar.classList.remove('show'), 2000);
}
function createSnackbar(snackbarId) {
    if (!document.getElementById(snackbarId)) {
        const snackbar = document.createElement('div');
        snackbar.id = snackbarId;
        snackbar.classList.add('snackbar'); // Add snackbar styles if needed
        document.body.appendChild(snackbar);
    }
}