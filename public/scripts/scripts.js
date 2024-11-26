function openModal(event) {
    event.preventDefault();
    document.getElementById('forgotPasswordModal').style.display = 'block';
}
// Close the modal when the close button is clicked
function closeModal() {
    const modal = document.getElementById('forgotPasswordModal');
    modal.style.display = 'none'; // Hide the modal
    document.getElementById('email').value = ""; // Clear the email field
}
// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('forgotPasswordModal');
    if (event.target == modal) {
        modal.style.display = 'none'; // Hide the modal
        document.getElementById('email').value = ""; // Clear the email field
    }
};
window.openChat = function() {
    document.getElementById("chatPopup").style.display = "block";
    document.getElementById("btnChat").style.display = "none";
    
    const messageInput = document.getElementById("msg");
    const sendMessage = document.getElementById("sendMessage");

    if (!messageInput) {
        console.error("Message input element with id 'msg' is missing.");
    }
    if (!sendMessage) {
        console.error("Send button element with id 'sendMessage' is missing.");
    }
    // Check if elements exist before adding event listener
    if (messageInput && sendMessage) {
        // Initially disable the "Send" button
        sendMessage.disabled = true;
        messageInput.addEventListener("input", function() {
            sendMessage.disabled = messageInput.value.trim() === "";
        });
    } 
    window.closeChat = function() {
        document.getElementById("chatPopup").style.display = "none";
        document.getElementById("btnChat").style.display = "block";
        
        // Reset form elements
        if (messageInput && sendMessage) {
            messageInput.value = "";    // Clear textarea
            sendMessage.disabled = true; // Disable "Send" button
        } 
    };

};

function openPage(pageName) {
    window.location = `${pageName}.html`;
}
function showSnackbar(message, type, snackbarId = "snackbar") {
    const snackbar = document.getElementById(snackbarId);

    if (!snackbar) {
        console.error("Snackbar element not found!");
        return;
    }

    snackbar.innerHTML = message;
    //snackbar.style.backgroundColor = type === "success" ? "#2ECC71" : "#E74C3C";
    snackbar.classList.add("show");

    setTimeout(() => {
        snackbar.classList.add("hide");
    }, 2000);

    setTimeout(() => {
        snackbar.classList.remove("show", "hide");
    }, 2500);
}

function showSnackbarContact() {
    showSnackbar('E-mail sent successful', 'success');
}

function cleanInput() {// Clear inputs from reset button (onclick="cleanInput()")
    document.querySelectorAll("input[type='text'], input[type='password']").forEach(input => {
        input.value = ""; // Clear input fields
    });
}
