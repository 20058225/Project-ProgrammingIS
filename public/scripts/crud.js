// @@ Handle Register
const addUser = async ({ userFullName, userEmail, userPassword, userPasswordConf }) => {
    // Check if passwords match
    if (userPassword !== userPasswordConf) {
        showSnackbar('Passwords do not match!', 'error');
        return;
    }    
    try {
        // Make a request to the backend API to add a user
        const response = await fetch('/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userFullName, userEmail, userPassword })
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
// @@ Handle login
const loginUser = async ({ userFullName, userPassword }) => {
    try {
        const response = await fetch('/getUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userFullName, userPassword })
        });

        if (!response.ok) throw new Error(await response.text());

        showSnackbar('Login successful!', 'success'); // Display success message
        window.location.href = 'pos.html'; // Redirect to pos.html
    } catch (error) {
        console.error('Error logging in:', error);
        showSnackbar(error.message, 'error');
    }
};
// @@ Handle Search
const searchUser = async (query) => {
    const resultsContainer = document.getElementById('searchResults');
    try {
        const response = await fetch(`/searchUser?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error(await response.text());

        const users = await response.json();
        resultsContainer.innerHTML = users
            .map(user => `<div>${user.userFullName} - ${user.userEmail}</div>`)
            .join('');
    } catch (error) {
        console.error('Error searching user:', error);
        showSnackbar(error.message, 'error');
    }
};
// @@ Update user
const updateUser = async (userID, { userFullName, userEmail, userPassword }) => {
    try {
        const response = await fetch(`/updateUser`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID, userFullName, userEmail, userPassword })
        });
        if (!response.ok) throw new Error(await response.text());
        showSnackbar('User updated successfully.', 'success');
    } catch (error) {
        console.error('Error updating user:', error);
        showSnackbar(error.message, 'error');
    }
};
// @@ Delete user
const deleteUser = async (userID) => {
    try {
        const response = await fetch(`/deleteUser/${userID}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(await response.text());
        showSnackbar('User deleted successfully.', 'success');
    } catch (error) {
        console.error('Error deleting user:', error);
        showSnackbar(error.message, 'error');
    }
};