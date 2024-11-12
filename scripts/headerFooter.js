document.addEventListener("DOMContentLoaded", function() {
    // Add Head Elements
    const titleHTML = `
        <title>PubPal</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

        <link rel="stylesheet" href="styles/style.css">
        <link rel="stylesheet" href="styles/media.css">
        <link rel="stylesheet" href="styles/animation.css">

    `;
    document.head.insertAdjacentHTML("beforeend", titleHTML);

    // Add Header Section with Dynamic Content
    const currentFile = window.location.pathname.split("/").pop();
    // Define the content for each page
    const pageContent = {
        "index.html": {
            title: "Welcome to PubPal's Systems!",
            subtitle: "Here you find the best tools to manage your establishment."
        },
        "login.html": {
            title: "Login",
            subtitle: "Login."
        },
        "home.html": {
            title: "home",
            subtitle: "home."
        },
        "user.html": {
            title: "user",
            subtitle: "user."
        },
        "customize.html": {
            title: "Coming Soon",
            subtitle: "Stay tuned for updates."
        },
        "announcements.html": {
            title: "PubPal's Systems!",
            subtitle: "Latest updates and information"
        },
        "contactUs.html": {
            title: "Contact Us!",
            subtitle: "If you have any questions, please fill out the form below and await your response."
        }
    };

    // Get title and subtitle for the current page or set default values
    const { title = "", subtitle = "" } = pageContent[currentFile] || {};

    // Generate header HTML
    const headerElement = document.querySelector("header");
    if (headerElement) {
        const headerHTML = `
                    <div class="header-wrapper">
                        <div class="header-container">
                            <a href="index.html"><img src="images/logo.png" alt="PubPal" class="icons" id="logo"></a>
                            <div class="header-text">
                                <h3 id="header-title">${title}</h3>
                                <h6 id="header-subtitle">${subtitle}</h6>
                            </div>
                        </div>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="contactUs.html">Book Demo</a></li>
                            <li><a href="announcements.html">News</a></li>
                            <li><a href="contactUs.html">Contact Us</a></li>
                            <li><a href="about.html">About</a></li>
                        </ul>
                    </div>
                    <button onclick="btnGoTop()" id="btnGoTop" title="Go to top"><i class="fa-solid fa-arrow-up"></i></button>
                    <!--<button onclick="btnGoTop()" id="btnGoTop" title="Go to top"><i class="fa-regular fa-circle-user"></i></button>
                        <button onclick="btnGoTop()" id="btnGoTop" title="Go to top"><i class="fa-regular fa-circle-question"></i></button>                    
                    -->
        `;
        headerElement.insertAdjacentHTML("beforeend", headerHTML);
    }

    // Add Footer Section
    const footerElement = document.querySelector(".footer");
    if (footerElement) {
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
        footerElement.insertAdjacentHTML("beforeend", footerHTML);
    }
});