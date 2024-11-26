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
const updateUser = async ({ id, username, email, password }) => {
    try {
        const response = await fetch('/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, username, email, password }),
        });

        if (!response.ok) { throw new Error(await response.text()); }

        alert(await response.text()); // Success message
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
    }
};

// Attach event listener to the update form
document.getElementById('updateUserForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const id = document.getElementById('updateUserId').value;
    const username = document.getElementById('updateUsername').value;
    const email = document.getElementById('updateEmail').value;
    const password = document.getElementById('updatePassword').value;

    updateUser({ id, username, email, password });
});