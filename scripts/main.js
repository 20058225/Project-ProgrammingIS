document.addEventListener("DOMContentLoaded", function() {
    const currentFile = window.location.pathname.split("/").pop();

    // Define the content for each page
    const pageContent = {
        "index.html": {
            main: `<h2>Welcome to PubPal Systems!</h2><p>Find the best tools to manage your establishment.</p>`,
            redirect: false
        },
        "login.html": {
            main: `<form id="loginForm"><input type="text" placeholder="Username"><input type="password" placeholder="Password"><button type="submit">Login</button></form>`,
            redirect: false
        },
        "home.html": {
            main: `<h2>Home</h2><p>Welcome to your dashboard. Start managing your bar inventory!</p>`,
            redirect: false
        },
        "user.html": {
            main: `<h2>User Management</h2><button onclick="addUser()">Add User</button>`,
            redirect: false
        },
        "customize.html": {
            main: `<h2>Coming Soon!</h2><div class="snippet"><div class="dot-falling"></div></div>`,
            redirect: true, // Indicate whether this page should redirect
            redirectDelay: 2000 // Delay in milliseconds
        },
        "announcements.html": {
            main: "<p>Hi there! Check out the latest announcements.</p>",
            redirect: false
        }
    };

    // Check if the page content is defined for the current file
    const { main = "", redirect = false, redirectDelay = 0 } = pageContent[currentFile] || {};

    // Insert content into <main>
    const mainElement = document.querySelector("main");
    if (mainElement) {
        mainElement.innerHTML = main;
    }

    // Redirect if specified in the content config
    if (redirect) {
        setTimeout(function() {
            window.location = "index.html";
        }, redirectDelay);
    }
});
