document.addEventListener("DOMContentLoaded", function() {
    // Show "Go to Top" button when scrolling down
    window.onscroll = function() { 
        scrollFunction() 
    };

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
    const header = document.getElementById("main-header");
    const logo = document.getElementById("logo");
    const headerContainer = document.querySelector(".header-container");
    const headerWrapper = document.querySelector(".header-wrapper");

    if (header && logo && headerContainer && headerWrapper) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
                headerContainer.classList.add("scrolled");
                logo.classList.add("scrolled-logo");
                headerWrapper.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
                headerContainer.classList.remove("scrolled");
                logo.classList.remove("scrolled-logo");
                headerWrapper.classList.remove("scrolled");
            }
        });
    }

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
