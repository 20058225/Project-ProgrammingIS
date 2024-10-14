document.addEventListener("DOMContentLoaded", function() {
    fetch("model/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });
    fetch("model/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });
});
function openLogin(){
    window.location="Login.html";
}
function openUser(){
    window.location="User.html";
}
function openBeverage(){
    window.location="Beverage.html";
}
function openLogin(){
    window.location="Login.html";
}