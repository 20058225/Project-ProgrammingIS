document.addEventListener("DOMContentLoaded", function() {
    // Show "Go to Top" button when scrolling down
    window.onscroll = function() { 
        scrollFunction();
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
                    console.log("Header scrolled class added");
                } else {
                    header.classList.remove("scrolled");
                    logo.classList.remove("scrolled-logo");
                    headerContent.classList.remove("scrolled");
                    console.log("Header scrolled class removed");
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

function openPage(pageName) {
    window.location = `${pageName}.html`;
}
