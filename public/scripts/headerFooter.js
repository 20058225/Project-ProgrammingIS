document.addEventListener("DOMContentLoaded", function() {
    // Add Head Elements
    const headHTML = `
        <title>PubPal</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

        <link rel="stylesheet" href="styles/style.css">
        <link rel="stylesheet" href="styles/modal.css">
        <link rel="stylesheet" href="styles/login.css">
    `;
    document.head.insertAdjacentHTML("beforeend", headHTML);

    // Add Header Section with Dynamic Content
    const currentFile = window.location.pathname.split("/").pop();
    const pageContent = {
        "index.html": {
            title: "Welcome to PubPal's Systems!",
            subtitle: "Here you find the best tools to manage your establishment."
        },
        "login.html": { 
            subtitle: "Please register or log in with us."
        },
        "users.html": {
            title: "User Management System",
            subtitle: "Manage all profiles here."
        },
        "customize.html": {
            title: "Coming Soon",
            subtitle: "Stay tuned for updates."
        },
        "announcements.html": {
            title: "PubPal's News",
            subtitle: "Latest updates and information"
        },
        "contact-us.html": {
            title: "Contact Us!",
            subtitle: "Feel free to reach out to us."
        },
        "privacy-policy.html": {
            title: "Privacy Policy",
            subtitle: "Feel free to reach out to us."
        }
    };

    const { title = "", subtitle = "" } = pageContent[currentFile] || {};

    const headerElement = document.querySelector("header");
    if (headerElement) {
        const headerHTML = `
                    <div class="header-wrapper">
                        <div class="header-container">
                            <div class="header-content">
                                <div class="logo-container">
                                    <a href="#" onclick="openPage('index')"><img src="images/logo.png" alt="PubPal" class="icons" id="logo"></a>
                                </div>
                                <div class="header-text">
                                    <h3 id="header-title">${title}</h3>
                                    <h6 id="header-subtitle">${subtitle}</h6>
                                </div>
                            </div> 
                            <div>
                                <nav class="header-menu">
                                    <ul class="nav-list">
                                        <li class="nav-item"><a href="#" onclick="openPage('index')">Home</a></li>
                                        <li class="nav-item"><a href="#" onclick="openPage('login')">Login</a></li>
                                        <li class="nav-item"><a href="#" onclick="openPage('announcements')">News</a></li>
                                        <li class="nav-item"><a href="#" onclick="openPage('contact-us')">Book Demo</a></li>
                                        <li class="nav-item"><a href="#" onclick="openPage('contact-us')">About</a></li>
                                    </ul>
                                </nav>  
                            </div>                                         
                        </div>
                    <button onclick="btnGoTop()" id="btnGoTop" title="Go to top"><i class="fa-solid fa-arrow-up"></i></button>
                    <button onclick="openChat()" id="btnChat" class="btnChat" title="Chat"><i class="fa-regular fa-comment-dots"></i></button>
                    
                    <!--@@ CHAT @@-->
                    <div class="chat-popup form-container" id="chatPopup">
                        <h1>Chat</h1>
                        <label for="msg"><b>Message</b></label>
                        <textarea id="msg" placeholder="Hey there! How I can help you today?" name="msg" required></textarea>
                        <div class="btnForm">
                            <button type="button" class="btn" id="sendMessage" onclick="showSnackbar(), closeForm()" disabled>Submit</button>
                            <button type="reset" class="btn cancel" onclick="closeForm()">Close</button>
                        </div>
                    </div>
        `;
        headerElement.insertAdjacentHTML("beforeend", headerHTML);
    }

    // @@ Add Footer Section
    const footerElement = document.querySelector(".footer");
    if (footerElement) {
        const footerHTML = `
            <div>
                <p>&copy; ${new Date().getFullYear()} My Website. All rights reserved. Discover our <a href="#" onclick="openPage('privacy-policy')"><u>privacy policy</u></a>.</p>
                <p>Brenda Lopes</p>
                <a href="https://www.linkedin.com/in/llopesbrenda" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                <a href="https://github.com/20058225" target="_blank"><i class="fa-brands fa-github"></i></a>
                <a href="mailto:20058225@mydbs.ie" target="_blank"><i class="fas fa-envelope"></i></a>
                <a href="tel:+3530839999999"><i class="fas fa-phone"></i></a>
            </div>
        `;
        footerElement.insertAdjacentHTML("beforeend", footerHTML);
    }

    // @@ "Go to Top" Button Functionality
    const btnGoTop = document.getElementById("btnGoTop");
    window.onscroll = function() { 
        if (btnGoTop) {
            btnGoTop.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";
        }
    };
    window.btnGoTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});