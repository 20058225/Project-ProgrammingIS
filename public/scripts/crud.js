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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        
        const data = await response.text();
        showSnackbar(data); // Display success message
    } catch (error) {
        console.error('Error adding user:', error);
        showSnackbar('Error adding user: ' + error.message);
    }
};
// Handle form submission
const addUserForm = document.getElementById('addUserForm');
addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('manageUserName').value;
    const email = document.getElementById('manageUserEmail').value;
    const password = document.getElementById('managePassword').value;
    const passwordConf = document.getElementById('managePasswordConf').value;

    addUser({ username, email, password, passwordConf });
});

// @@ Handle login
const loginUser = async ({ username, password }) => {
    try {
        const response = await fetch('/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) throw new Error(await response.text());

        showSnackbar('Login successful!', 'success'); // Display success message
        window.location.href = 'pos.html'; // Redirect to pos.html
    } catch (error) {
        console.error('Error logging in:', error);
        showSnackbar(error.message, 'error');
    }
};
// Handle form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('loginUserName').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        showSnackbar('Username and password are required.', 'error');
        return;
    }

    loginUser({ username, password });
});

// @@ Handle Search
document.getElementById('searchUserButton').addEventListener('click', async () => {
    const query = document.getElementById('searchUser').value;
    const resultsContainer = document.getElementById('searchResults');

    try {
        const response = await fetch(`/searchUser?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            const errorText = await response.text(); // Read error text
            throw new Error(errorText || `HTTP Error: ${response.status}`);
        }

        const users = await response.json(); // Parse JSON only if response is OK
        resultsContainer.innerHTML = users
        .map(user => `<div>${user.userFullName} - ${user.userEmail}</div>`)
        .join('');
    } catch (error) {
        console.error('Error fetching search results:', error);
        showSnackbar(error.message);
    }
});