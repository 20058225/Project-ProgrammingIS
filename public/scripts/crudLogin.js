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

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
        
        const data = await response.text();
        showSnackbar(data); // Display success message
        cleanInput();
    } catch (error) {
        console.error('Error adding user:', error);
        showSnackbar('Error adding user: ' + error.message);
    }
};

// Handle form submission
const addUserForm = document.getElementById('addUserForm');
addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('manageUsername').value;
    const email = document.getElementById('manageUseremail').value;
    const password = document.getElementById('managePassword').value;
    const passwordConf = document.getElementById('managePasswordConf').value;

    addUser({ username, email, password, passwordConf });
});

// @@ Handle login
const loginUser = async ({ email, password }) => {
    try {
        const response = await fetch('/getUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) { const errorText = await response.text(); throw new Error(errorText); }

        const successMessage = await response.text();
        showSnackbar('Login successful!', 'success'); // Display success message
        window.location.href = 'pos.html'; // Redirect to pos.html
    } catch (error) {
        console.error('Error logging in:', error);
        showSnackbar(error.message);
        cleanInput();
    }
};
// Handle form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    loginUser({ email, password });
});