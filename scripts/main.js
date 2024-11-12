document.addEventListener("DOMContentLoaded", function() {
    const currentFile = window.location.pathname.split("/").pop();

    // Define the content for each page
    const pageContent = {
        "index.html": {
            main: `
                    <h2>Welcome to PubPal Systems!</h2>
                    <p>Find the best tools to manage your establishment.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat condimentum turpis, vitae sagittis nisi suscipit quis. Nullam sem purus, rutrum vel condimentum id, aliquam et urna. Nunc nulla ligula, maximus non erat sit amet, fringilla consectetur odio. Vivamus sit amet augue lacus. Curabitur faucibus condimentum urna, eget bibendum felis congue sed. Nulla facilisi. Duis efficitur vitae velit in condimentum. Proin dignissim ultricies dapibus. Nullam vehicula eros at nisi laoreet, a molestie dui bibendum. Aliquam erat volutpat. Quisque cursus nibh eu est cursus, id convallis orci semper. Nullam vitae euismod ligula. Vivamus vel facilisis risus. Nulla egestas purus sit amet faucibus congue. Cras tempor tincidunt dapibus. Nunc quis purus iaculis, pharetra justo vel, molestie lacus.
                </p><p>Nunc et viverra dolor, id consequat quam. Vestibulum sodales erat et leo maximus tincidunt sit amet at lectus. Nam efficitur interdum est sit amet auctor. Vestibulum rutrum vulputate neque vitae vulputate. Curabitur convallis eros vel ex semper, id porttitor ligula consectetur. Pellentesque congue lacinia libero in euismod. Proin pulvinar semper metus, eu efficitur dolor fringilla at. Sed at tempus velit. Nam et lorem a nisi vehicula varius ut mattis eros. Curabitur sagittis nec metus et semper. Etiam quis gravida elit. Mauris lobortis dolor nec quam dapibus, sit amet dapibus tellus rutrum.
                </p><p>Pellentesque sollicitudin a risus sit amet mollis. Integer pharetra porta nunc a volutpat. Suspendisse id turpis gravida sapien molestie facilisis. Sed dignissim varius orci id tempus. Aenean varius elit in arcu pretium, iaculis bibendum dolor volutpat. Curabitur scelerisque odio arcu, a vestibulum lectus pharetra non. Etiam a dapibus tortor, vel porta lacus.
                </p><p>Sed semper, ante a ullamcorper tempor, dui purus ultricies urna, ut gravida mi augue vel mi. Morbi ultrices facilisis vestibulum. Ut scelerisque mauris eget leo lobortis, eu auctor magna condimentum. Nullam eget ultricies lorem, vel sagittis mi. Cras sodales non tellus quis vehicula. Duis in faucibus dui, a suscipit nibh. Praesent lorem neque, faucibus non nisi eget, malesuada placerat velit. Proin ultricies neque vel sapien faucibus cursus. Integer ac bibendum elit, ut elementum nisl. Nullam augue tellus, blandit at efficitur eu, condimentum sed ipsum. Sed fermentum molestie metus facilisis vestibulum. Aenean fringilla ac massa non blandit. Nam suscipit consequat consectetur. Vestibulum urna risus, convallis quis magna a, gravida aliquam sem. In faucibus felis et libero porta, vitae egestas leo rhoncus. Proin vel nunc cursus, porttitor dui nec, scelerisque ex.
                </p><p>Curabitur convallis non lectus et rhoncus. Curabitur enim risus, efficitur eu gravida in, hendrerit nec ex. Pellentesque elementum consectetur diam a rhoncus. Ut dapibus dolor ut consequat rhoncus. Vivamus facilisis tortor pellentesque, pellentesque magna in, dignissim turpis. Sed at tempus sem. In hac habitasse platea dictumst. Curabitur ac justo non lectus dictum accumsan a vitae velit. Integer vel dui sit amet turpis aliquam tristique. Etiam quis rutrum velit. Vivamus pretium quis magna non ullamcorper. Mauris lobortis viverra orci in vulputate. Proin risus turpis, condimentum quis dignissim non, posuere id felis. Nulla facilisi.
                </p><p>Nunc et viverra dolor, id consequat quam. Vestibulum sodales erat et leo maximus tincidunt sit amet at lectus. Nam efficitur interdum est sit amet auctor. Vestibulum rutrum vulputate neque vitae vulputate. Curabitur convallis eros vel ex semper, id porttitor ligula consectetur. Pellentesque congue lacinia libero in euismod. Proin pulvinar semper metus, eu efficitur dolor fringilla at. Sed at tempus velit. Nam et lorem a nisi vehicula varius ut mattis eros. Curabitur sagittis nec metus et semper. Etiam quis gravida elit. Mauris lobortis dolor nec quam dapibus, sit amet dapibus tellus rutrum.
                </p><p>Pellentesque sollicitudin a risus sit amet mollis. Integer pharetra porta nunc a volutpat. Suspendisse id turpis gravida sapien molestie facilisis. Sed dignissim varius orci id tempus. Aenean varius elit in arcu pretium, iaculis bibendum dolor volutpat. Curabitur scelerisque odio arcu, a vestibulum lectus pharetra non. Etiam a dapibus tortor, vel porta lacus.
                </p><p>Sed semper, ante a ullamcorper tempor, dui purus ultricies urna, ut gravida mi augue vel mi. Morbi ultrices facilisis vestibulum. Ut scelerisque mauris eget leo lobortis, eu auctor magna condimentum. Nullam eget ultricies lorem, vel sagittis mi. Cras sodales non tellus quis vehicula. Duis in faucibus dui, a suscipit nibh. Praesent lorem neque, faucibus non nisi eget, malesuada placerat velit. Proin ultricies neque vel sapien faucibus cursus. Integer ac bibendum elit, ut elementum nisl. Nullam augue tellus, blandit at efficitur eu, condimentum sed ipsum. Sed fermentum molestie metus facilisis vestibulum. Aenean fringilla ac massa non blandit. Nam suscipit consequat consectetur. Vestibulum urna risus, convallis quis magna a, gravida aliquam sem. In faucibus felis et libero porta, vitae egestas leo rhoncus. Proin vel nunc cursus, porttitor dui nec, scelerisque ex.
                </p><p>Curabitur convallis non lectus et rhoncus. Curabitur enim risus, efficitur eu gravida in, hendrerit nec ex. Pellentesque elementum consectetur diam a rhoncus. Ut dapibus dolor ut consequat rhoncus. Vivamus facilisis tortor pellentesque, pellentesque magna in, dignissim turpis. Sed at tempus sem. In hac habitasse platea dictumst. Curabitur ac justo non lectus dictum accumsan a vitae velit. Integer vel dui sit amet turpis aliquam tristique. Etiam quis rutrum velit. Vivamus pretium quis magna non ullamcorper. Mauris lobortis viverra orci in vulputate. Proin risus turpis, condimentum quis dignissim non, posuere id felis. Nulla facilisi.
                </p><p>Nunc et viverra dolor, id consequat quam. Vestibulum sodales erat et leo maximus tincidunt sit amet at lectus. Nam efficitur interdum est sit amet auctor. Vestibulum rutrum vulputate neque vitae vulputate. Curabitur convallis eros vel ex semper, id porttitor ligula consectetur. Pellentesque congue lacinia libero in euismod. Proin pulvinar semper metus, eu efficitur dolor fringilla at. Sed at tempus velit. Nam et lorem a nisi vehicula varius ut mattis eros. Curabitur sagittis nec metus et semper. Etiam quis gravida elit. Mauris lobortis dolor nec quam dapibus, sit amet dapibus tellus rutrum.
                </p><p>Pellentesque sollicitudin a risus sit amet mollis. Integer pharetra porta nunc a volutpat. Suspendisse id turpis gravida sapien molestie facilisis. Sed dignissim varius orci id tempus. Aenean varius elit in arcu pretium, iaculis bibendum dolor volutpat. Curabitur scelerisque odio arcu, a vestibulum lectus pharetra non. Etiam a dapibus tortor, vel porta lacus.
                </p><p>Sed semper, ante a ullamcorper tempor, dui purus ultricies urna, ut gravida mi augue vel mi. Morbi ultrices facilisis vestibulum. Ut scelerisque mauris eget leo lobortis, eu auctor magna condimentum. Nullam eget ultricies lorem, vel sagittis mi. Cras sodales non tellus quis vehicula. Duis in faucibus dui, a suscipit nibh. Praesent lorem neque, faucibus non nisi eget, malesuada placerat velit. Proin ultricies neque vel sapien faucibus cursus. Integer ac bibendum elit, ut elementum nisl. Nullam augue tellus, blandit at efficitur eu, condimentum sed ipsum. Sed fermentum molestie metus facilisis vestibulum. Aenean fringilla ac massa non blandit. Nam suscipit consequat consectetur. Vestibulum urna risus, convallis quis magna a, gravida aliquam sem. In faucibus felis et libero porta, vitae egestas leo rhoncus. Proin vel nunc cursus, porttitor dui nec, scelerisque ex.
                </p><p>Curabitur convallis non lectus et rhoncus. Curabitur enim risus, efficitur eu gravida in, hendrerit nec ex. Pellentesque elementum consectetur diam a rhoncus. Ut dapibus dolor ut consequat rhoncus. Vivamus facilisis tortor pellentesque, pellentesque magna in, dignissim turpis. Sed at tempus sem. In hac habitasse platea dictumst. Curabitur ac justo non lectus dictum accumsan a vitae velit. Integer vel dui sit amet turpis aliquam tristique. Etiam quis rutrum velit. Vivamus pretium quis magna non ullamcorper. Mauris lobortis viverra orci in vulputate. Proin risus turpis, condimentum quis dignissim non, posuere id felis. Nulla facilisi.
                </p><p>Nunc et viverra dolor, id consequat quam. Vestibulum sodales erat et leo maximus tincidunt sit amet at lectus. Nam efficitur interdum est sit amet auctor. Vestibulum rutrum vulputate neque vitae vulputate. Curabitur convallis eros vel ex semper, id porttitor ligula consectetur. Pellentesque congue lacinia libero in euismod. Proin pulvinar semper metus, eu efficitur dolor fringilla at. Sed at tempus velit. Nam et lorem a nisi vehicula varius ut mattis eros. Curabitur sagittis nec metus et semper. Etiam quis gravida elit. Mauris lobortis dolor nec quam dapibus, sit amet dapibus tellus rutrum.
                </p><p>Pellentesque sollicitudin a risus sit amet mollis. Integer pharetra porta nunc a volutpat. Suspendisse id turpis gravida sapien molestie facilisis. Sed dignissim varius orci id tempus. Aenean varius elit in arcu pretium, iaculis bibendum dolor volutpat. Curabitur scelerisque odio arcu, a vestibulum lectus pharetra non. Etiam a dapibus tortor, vel porta lacus.
                </p><p>Sed semper, ante a ullamcorper tempor, dui purus ultricies urna, ut gravida mi augue vel mi. Morbi ultrices facilisis vestibulum. Ut scelerisque mauris eget leo lobortis, eu auctor magna condimentum. Nullam eget ultricies lorem, vel sagittis mi. Cras sodales non tellus quis vehicula. Duis in faucibus dui, a suscipit nibh. Praesent lorem neque, faucibus non nisi eget, malesuada placerat velit. Proin ultricies neque vel sapien faucibus cursus. Integer ac bibendum elit, ut elementum nisl. Nullam augue tellus, blandit at efficitur eu, condimentum sed ipsum. Sed fermentum molestie metus facilisis vestibulum. Aenean fringilla ac massa non blandit. Nam suscipit consequat consectetur. Vestibulum urna risus, convallis quis magna a, gravida aliquam sem. In faucibus felis et libero porta, vitae egestas leo rhoncus. Proin vel nunc cursus, porttitor dui nec, scelerisque ex.
                </p><p>Curabitur convallis non lectus et rhoncus. Curabitur enim risus, efficitur eu gravida in, hendrerit nec ex. Pellentesque elementum consectetur diam a rhoncus. Ut dapibus dolor ut consequat rhoncus. Vivamus facilisis tortor pellentesque, pellentesque magna in, dignissim turpis. Sed at tempus sem. In hac habitasse platea dictumst. Curabitur ac justo non lectus dictum accumsan a vitae velit. Integer vel dui sit amet turpis aliquam tristique. Etiam quis rutrum velit. Vivamus pretium quis magna non ullamcorper. Mauris lobortis viverra orci in vulputate. Proin risus turpis, condimentum quis dignissim non, posuere id felis. Nulla facilisi.
                </p>
            `,
            redirect: false
        },
        "login.html": {
            main: `<form id="loginForm"><input type="text" placeholder="Username"><input type="password" placeholder="Password"><button type="submit">Login</button></form>`,
            redirect: false
        },
        "home.html": {
            main: `<h2>Home</h2>
                    <p>Welcome to your dashboard. Start managing your bar inventory!</p>
                  <p>Add class .disabled if a page for some reason is disabled:</p>
                    <ul class="pagination">
                        <li><a href="#">Beer</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li class="disabled"><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                    </ul>
            `,
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
        },
        "contactUs.html": {
            main: "<p>Hi there! Check out the latest announcements.</p>",
            redirect: false
        }
    };

    // Check if the page content is defined for the current file
    const { main = "", redirect = false, redirectDelay = 0 } = pageContent[currentFile] || {};

    // Insert content into <main>
    const mainElement = document.querySelector("main");
    if (mainElement) mainElement.innerHTML = main;
    
    // Redirect if specified in the content config
    if (redirect) {
        setTimeout(() => window.location = "index.html", redirectDelay);
    }
});