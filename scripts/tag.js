function clearInputs() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') 
            input.checked = false;
        else if (input.type === 'text' || input.type === 'number') 
            input.value = '';
    });
    document.getElementById('result').style.display = 'none';
}
function openPage(pageName) {
    window.location = `${pageName}.html`;
}
function showHidePwd() {
    var pwd = document.getElementById("pwdLogin");
    var pwdIcon = document.getElementById("pwdIcon");
    if (pwd.type === "password" && pwdIcon.src.endsWith("eye_closed.png")) {
        pwd.type = "text";
        pwdIcon.src = "img/eye_opened.png";

    } else {
        pwd.type = "password";
        pwdIcon.src = "img/eye_closed.png";
    }
    return false;
  }
