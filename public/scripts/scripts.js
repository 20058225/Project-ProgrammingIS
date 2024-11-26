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

function initChatControls() {
    const messageInput = document.getElementById("msg");
    const sendMessage = document.getElementById("sendMessage");

    if (!messageInput || !sendMessage) {
        console.error("Chat elements not found!");
        return;
    }

    // Add input listener
    messageInput.addEventListener("input", function () {
        sendMessage.disabled = messageInput.value.trim() === "";
    });

    // Initially disable the button
    sendMessage.disabled = true;
}

function openChat() {
    document.getElementById("chatPopup").style.display = "block";
    document.getElementById("btnChat").style.display = "none";
}

function closeChat() {
    document.getElementById("chatPopup").style.display = "none";
    document.getElementById("btnChat").style.display = "block";

    const messageInput = document.getElementById("msg");
    if (messageInput) messageInput.value = ""; // Clear input
}

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
    snackbar.style.backgroundColor = type === "success" ? "#2ECC71" : "#E74C3C";
    snackbar.classList.add("show");

    setTimeout(() => {
        snackbar.classList.add("hide");
    }, 2000);

    setTimeout(() => {
        snackbar.classList.remove("show", "hide");
    }, 2500);
}

function cleanInput() {// Clear inputs from reset button (onclick="cleanInput()")
    document.querySelectorAll("input[type='text'], input[type='password']").forEach(input => {
        input.value = ""; // Clear input fields
    });
}
