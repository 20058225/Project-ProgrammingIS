let stock = {}; // Declare a global variable for stock data
let orderTotal = 0; // Declare a global variable to keep track of the order total

document.addEventListener("DOMContentLoaded", () => {
    const jsonFilePath = './scripts/stock.json';

    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            stock = data; // Store the data in the global stock variable
            generateButtons(stock);
            filterProducts('Draught'); // Initial display of Draught products
        })
        .catch(error => console.error('Error loading stock.json:', error));
});

function generateButtons(data) {
    const posContainer = document.getElementById('productContainer');
    if (!posContainer) {
        console.error('Error: POS container not found.');
        return;
    }

    data.categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category', category.name.toLowerCase());

        const categoryHeading = document.createElement('h3');
        categoryHeading.textContent = category.name;
        categoryDiv.appendChild(categoryHeading);

        category.products.forEach(product => {
            const button = document.createElement('button');
            button.textContent = `${product.name}`;
            button.classList.add('product-btn');
            button.addEventListener('click', () => {
                addToOrder(product);
            });
            categoryDiv.appendChild(button);
        });
        posContainer.appendChild(categoryDiv);
    });
}

function addToOrder(product) {
    const orderTextarea = document.querySelector('.itemsDescript .textarea');
    const totalInput = document.querySelector('.itemsAmountTotal');

    if (orderTextarea) {
        // Append the product name and price to the order description
        orderTextarea.value += `${product.name}  €${product.price.toFixed(2)}\n`;
    }
    if (totalInput) {
        // Update the total amount due
        orderTotal += product.price;
        totalInput.value = `€${orderTotal.toFixed(2)}`;
    }
}

function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const button = document.createElement('button');
        button.textContent = product.name;
        button.classList.add('product-btn');
        button.addEventListener('click', () => addToOrder(product));
        container.appendChild(button);
    });
}

function filterProducts(categoryName) {
    if (stock && stock.categories) {
        const category = stock.categories.find(cat => cat.name === categoryName);
        if (category) {
            displayProducts(category.products);
        } else {
            console.error(`Category "${categoryName}" not found.`);
        }
    }
}

// Sidebar toggle (if needed)
const toggleSidebar = document.getElementById('toggleSidebar');
if (toggleSidebar) {
    toggleSidebar.addEventListener('click', () => {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("open");
    });
}