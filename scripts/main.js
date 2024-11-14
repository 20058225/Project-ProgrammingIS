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
            `, redirect: false
        },
        "login.html": {
            main: `
                <section class="register column-thirty">
                    <form class="formRegister">
                        <div class="header-flex-container">
                            <a href="#" onclick="openPage('index')"><img src="images/logo.png" alt="PubPal" class="icons" id="logo"></a>
                            <h3>Register</h3>
                        </div>
                        <div class="divColumn">
                            <div class="insertForm">
                                <label for="nameRegister">Full name:</label>
                                <input class="userPwd" type="text" id="nameRegister" name="name" required autocomplete="current-name">
                                <label for="nameRegister">Email:</label>
                                <input class="userPwd" type="text" id="usernameRegister" name="email" required autocomplete="current-username">

                                <label for="pwdRegister">Password:</label>
                                <div class="password-container">
                                    <input class="userPwd" type="password" id="pwdRegister" name="pwdRegister" required>
                                    <button type="button" onclick="showHidePwd('pwdRegister', 'pwdIconR')">
                                        <i class="fa-regular fa-eye-slash" id="pwdIconR" alt="Show/Hide Password"></i>
                                    </button>
                                    
                                    <input class="userPwd" type="password" id="pwdRegisterConfirm" name="pwdRegisterConfirm" required>
                                    <button type="button" onclick="showHidePwd('pwdRegisterConfirm', 'pwdIconRC')">
                                        <i class="fa-regular fa-eye-slash" id="pwdIconRC" alt="Show/Hide Password"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="btnForm">
                                <input class="btn button-primary"  onclick="snackBar()" value="Create" >
                                <input class="btn button-primary" type="reset" value="Cancel">
                            </div>
                        </div>
                    </form>
                    <div id="snackbarRegister">Registration completed successfully! 
                    <img src="images/logo.png" alt="PubPal" class="icons" id="logo"></a>
                    </div>
                </section>
                <section class="login column-thirty">
                    <form class="formLogin" action="pos.html">
                        <div class="header-flex-container">
                            <a href="#" onclick="openPage('index')"><img src="images/logo.png" alt="PubPal" class="icons" id="logo"></a>
                            <h3>Login</h3>
                        </div>
                        <div class="divColumn">
                            <div class="insertForm">
                                <label for="usernameLogin">Username:</label>
                                <input class="userPwd" type="text" id="usernameLogin" name="username" required autocomplete="current-username">
                                <label for="pwdLogin">Password:</label>
                                <div class="password-container">
                                    <input class="userPwd" type="password" id="pwdLogin" name="pwdLogin" required>
                                    <button type="button" onclick="showHidePwd('pwdLogin', 'pwdIcon')">
                                        <i class="fa-regular fa-eye-slash" id="pwdIcon" alt="Show/Hide Password"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="btnForm">
                                <input class="btn button-primary" type="submit" value="Submit">
                                <input class="btn button-primary" type="reset" value="Reset">
                            </div>
                        </div>
                        <div class="forgot-password"><a href="#" onclick="openModal(event)">Forgot Password?</a></div>
                    </form>
                </section>
                <section class="login">
                    <!-- Forgot Password Modal -->
                    <div id="forgotPasswordModal" class="modal">
                        <div class="modal-content">
                            <span class="close" onclick="closeModal()">&times;</span>
                            <h3>Reset Your Password</h3>
                            <p>Please enter your email address.</p>
                            <form id="forgotPasswordForm">
                                <input type="email" id="email" name="email" required placeholder="Email">
                                <button type="submit" class="btn button-primary">Send Reset Link</button>
                            </form>
                        </div>
                    </div>
                </section>
            `, redirect: false
        },
        "users.html": {
            main: `
                <h2>User Management</h2><button onclick="addUser()">Add User</button>
                <h2>Manage Users</h2>
                <input type="text" id="manageUsername" placeholder="Username">
                <input type="password" id="managePassword" placeholder="Password">
                <button onclick="clickAddUser()">Add User</button>
                <button onclick="clickEditUser()">Edit User</button>
                <button onclick="clickDeleteUser()">Delete User</button>
                       
            
            `,
            redirect: false
        },
        "customize.html": {
            main: `<h2>Coming Soon!</h2><div class="snippet"><div class="dot-falling"></div></div>`,
            redirect: true, // Indicate whether this page should redirect
            redirectDelay: 2000 // Delay in milliseconds
        },
        "announcements.html": {
            main: `<p>Hi there! Check out the latest announcements.</p>
            <h2>Coming Soon!</h2><div class="snippet"><div class="dot-falling"></div></div>`,
            redirect: true, // Indicate whether this page should redirect
            redirectDelay: 2000 // Delay in milliseconds
        },
        "contact-us.html": {
            main: `
                    <section class="column-thirty">
                        <h2>Contact Us</h2>
                        <form action="submit_contact.php" method="post">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required placeholder="Your Name">
                            
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder="Your Email">
                            
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Your Message"></textarea>
                            
                            <button type="submit" class="submit-btn">Send Message</button>
                        </form>
                    </section>

                    <!-- About Us Content (Right side) -->
                    <section class="column-sixty">
                        <h2>About PubPal Systems</h2>
                        <p>Welcome to PubPal Systems, your go-to solution for managing and tracking bar drinks sales efficiently and effectively. Our system is designed to streamline the sales process, enhance customer experience, and simplify inventory management.</p>
                        <p>Founded with a mission to support bar owners and managers, PubPal Systems offers customizable features that allow users to track sales, manage inventory, and adjust product offerings with ease. Whether you run a small local bar or a large pub, our platform adapts to your unique needs.</p>
                        <p>We value customer satisfaction and continuous improvement. Our team is dedicated to providing exceptional service, ensuring that our platform is easy to use, and helping you achieve your business goals.</p>
                        <p>Thank you for choosing PubPal Systems. We're here to support you in creating memorable experiences for your customers.</p>
                    </section>        
                    `,
            redirect: false
        },
        "privacy-policy.html": {
            main: `
                    <section>
                        <h2>1. Introduction</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.</p>
                    </section>
                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <ul>
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</li>
                            <li>Quisque velit nisi, pretium ut lacinia in, elementum id enim.</li>
                        </ul>
                    </section>
                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>Proin eget tortor risus. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
                        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
                    </section>
                    <section>
                        <h2>4. Sharing of Information</h2>
                        <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada.</p>
                        <p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh.</p>
                    </section>
                    <section>
                        <h2>5. Data Security</h2>
                        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.</p>
                        <p>Curabitur aliquet quam id dui posuere blandit.</p>
                    </section>
                    <section>
                        <h2>6. Changes to This Privacy Policy</h2>
                        <p>Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit.</p>
                    </section>
            `, redirect: false
        }
    };
            // Check if the page content is defined for the current file
    const { main = "", redirect = false, redirectDelay = 0 } = pageContent[currentFile] || {};
            // Insert content into <main>
    const mainElement = document.querySelector("main");
    if (mainElement) mainElement.innerHTML = main;
            // Redirect if specified in the content config
    if (redirect) setTimeout(() => window.location = "index.html", redirectDelay);
});