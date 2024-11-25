function openModal(event) {
    event.preventDefault();
    document.getElementById('forgotPasswordModal').style.display = 'block';
}
function closeModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
}
// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('forgotPasswordModal');
    if (event.target == modal) {
        document.getElementById('forgotPasswordModal').style.display = 'none';
    }
};
    // Open chat function
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

function setupChatInput(inputId, buttonId) {
    const messageInput = document.getElementById("msg");
    const sendMessage = document.getElementById("sendMessage");
    if (messageInput && sendMessage) {
        sendMessage.disabled = true;
        messageInput.addEventListener("input", function() {
            sendMessage.disabled = messageInput.value.trim() === "";
        });
    }}
document.addEventListener("DOMContentLoaded", function() {
    setupChatInput("msg", "sendMessage");
});

function openModal(event) {
    event.preventDefault();
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
}
function closeForm() { // Clear inputs
    //    document.getElementById('forgotPasswordModal').style.display = 'none';
    
    document.getElementById("chatPopup").style.display = "none";
    document.getElementById("btnChat").style.display = "block";
    const messageInput = document.getElementById("msg");
    const sendMessage = document.getElementById("sendMessage");
    if (messageInput && sendMessage) {
        messageInput.value = "";
        sendMessage.disabled = true;
    }
}
function openPage(pageName) {
    window.location = `${pageName}.html`;
}
function showSnackbar(message, type, snackbarId = 'snackbar') {
    createSnackbar(snackbarId); // Ensure snackbar exists
    const snackbar = document.getElementById(snackbarId);
    snackbar.innerHTML = message;
    snackbar.style.backgroundColor = type === 'success' ? '#2ECC71' : '#E74C3C';
    snackbar.classList.add('show');
    setTimeout(() => snackbar.classList.remove('show'), 2000);
}
function cleanInput() {// Clear inputs from reset button (onclick="cleanInput()")
    document.querySelectorAll("input[type='text'], input[type='password']").forEach(input => {
        input.value = ""; // Clear input fields
    });
}
