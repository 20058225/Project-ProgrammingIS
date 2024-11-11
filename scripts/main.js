document.addEventListener("DOMContentLoaded", function() {
    const currentFile = window.location.pathname.split("/").pop();

    // Define the content for each page
    const pageContent = {
        "comingsoon.html": {
            main: `
                <div class="col-3">
                    <div class="snippet" data-title="dot-falling">
                        <div class="stage">
                            <div class="dot-falling"></div>
                        </div>
                    </div>
                </div>
            `,
            redirect: true, // Indicate whether this page should redirect
            redirectDelay: 2000 // Delay in milliseconds
        },
        "announcements.html": {
            main: "<p>Hi there! Check out the latest announcements.</p>",
            redirect: false
        },
        "index.html": {
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
