document.addEventListener("DOMContentLoaded", function() {
    // Add Head Elements
    const titleHTML = `
        <title>PubPal</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" type="image/x-icon" href="../images/favicon.ico">
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <link rel="stylesheet" href="index.css">
    `;
    document.head.insertAdjacentHTML("beforeend", titleHTML);

    // Add Header Section with Dynamic Content
    const currentFile = window.location.pathname.split("/").pop();
    const headerHTML = `
        <a href="index.html"><img src="../images/logo.png" alt="Logo" class="icons" id="logo"></a>
        <h3>${currentFile === "index.html" ? "Welcome to PubPal's Systems!" : "BM Real Estate Announcements"}</h3>
        <h6>${currentFile === "index.html" ? "Here you find the best tools to manage your establishment." : "BM Real Estate Announcements"}</h6>
        <button onclick="btnGoTop()" id="btnGoTop" title="Go to top"><i class="fa-solid fa-arrow-up"></i></button>
    `;
    document.querySelector("header").insertAdjacentHTML("beforeend", headerHTML);

    // Add Footer Section
    const footerHTML = `
        <div>
            <p>&copy; ${new Date().getFullYear()} My Website. All rights reserved.</p>
            <p>Brenda Lopes</p>
            <a href="https://www.linkedin.com/in/llopesbrenda"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com/20058225"><i class="fa-brands fa-github"></i></a>
            <a href="mailto:20058225@mydbs.ie" target="_blank"><i class="fas fa-envelope"></i></a>
            <a href="tel:+3530839999999"><i class="fas fa-phone"></i></a>
        </div>
    `;
    document.querySelector(".footer").insertAdjacentHTML("beforeend", footerHTML);

    // Show "Go to Top" button when scrolling down
    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        const btn = document.getElementById("btnGoTop");
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }

    // Smooth scroll to top on button click
    window.btnGoTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});
