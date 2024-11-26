document.addEventListener("DOMContentLoaded", function() {
    window.onscroll = function() { scrollFunction(); };

    function scrollFunction() {
        const btn = document.getElementById("btnGoTop");
        if (btn) {  // Check if button exists
            btn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";
        }
    }

    // Smooth scroll to top on button click
    window.btnGoTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // JavaScript to toggle the "scrolled" class on scroll
    setTimeout(() => {
        // JavaScript to toggle the "scrolled" class on scroll
        const header = document.getElementById("main-header");
        const logo = document.getElementById("logo");
        const headerContent = document.querySelector(".header-content");

        if (header && logo && headerContent) {
            window.addEventListener("scroll", function() {
                if (window.scrollY > 50) {
                    header.classList.add("scrolled");
                    logo.classList.add("scrolled-logo");
                    headerContent.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                    logo.classList.remove("scrolled-logo");
                    headerContent.classList.remove("scrolled");
                }
            });
        } else {
            console.error("One or more header elements are missing.");
        }

        if (!header) console.error("Header element (#main-header) is missing.");
        if (!logo) console.error("Logo element (#logo) is missing.");
        if (!headerContent) console.error("Header wrapper (.header-wrapper) is missing.");
    }, 100); // Delay to allow dynamic elements to load
    // Dropdown toggle for mobile
    const dropdownBtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");

    if (dropdownBtn && dropdownContent) {  // Check if dropdown elements exist
        dropdownBtn.addEventListener("click", function(event) {
            event.preventDefault();
            // Toggle the display of the dropdown menu
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        });

        // Close the dropdown if clicked outside
        window.addEventListener("click", function(event) {
            if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.style.display = "none";
            }
        });
    }
});

function showHidePwd(inputId, iconId) {
    const pwd = document.getElementById(inputId);
    const pwdIcon = document.getElementById(iconId);
    if (pwd && pwdIcon) {
        if (pwd.type === "password") {
            pwd.type = "text";
            pwdIcon.classList.replace("fa-eye-slash", "fa-eye"); // Update icon
        } else {
            pwd.type = "password";
            pwdIcon.classList.replace("fa-eye", "fa-eye-slash"); // Update icon back to hidden
        }
    } else {
        console.error("Password input or icon element is missing.");
    }
}
window.addEventListener("beforeunload", function() {
    document.querySelectorAll("input[type='text'], input[type='password']").forEach(input => {
        input.value = ""; // Clear input fields
    });
});
function openPage(pageName) {
    window.location = `${pageName}.html`;
}

function cleanInput() {// Clear inputs from reset button (onclick="cleanInput()")
    document.querySelectorAll("input[type='text'], input[type='password']").forEach(input => {
        input.value = ""; // Clear input fields
    });
}
function showSnackbar(message, /*type,*/ snackbarId = 'snackbar') {
    createSnackbar(snackbarId); // Ensure snackbar exists
    const snackbar = document.getElementById(snackbarId);
    snackbar.innerHTML = `
        <img src="images/logo.png" alt="PubPal Logo" class="icons" id="logo">
        <span>${message}</span>
    `;
    //snackbar.style.backgroundColor = type === 'success' ? '#2ECC71' : '#E74C3C';
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