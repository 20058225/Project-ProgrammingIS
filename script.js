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