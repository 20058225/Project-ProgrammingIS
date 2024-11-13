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