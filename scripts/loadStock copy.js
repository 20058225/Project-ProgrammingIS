let stock = {}; // Global variable for stock data
let orderTotal = 0; // Global variable to keep track of the order total
let items = []; // Array to store ordered items
let selectedItemIndex = null; // Index of the currently selected item

// Function to load stock data from stock.json
function loadStock() {
    fetch('./scripts/stock.json')
        .then(response => response.json())
        .then(data => {
            stock = data; // Save data to the global stock variable
            renderCategories(stock.categories); // Render category structure
            filterProducts("Draught"); // Display Draught products by default
        })
        .catch(error => console.error('Error loading stock.json:', error));
}

// Function to render category structure without showing products
function renderCategories(categories) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = ""; // Clear previous content

    if (!categories) {
        console.error("Categories data is missing.");
        return;
    }

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category', category.name.toLowerCase());

        const categoryHeading = document.createElement('h3');
        categoryHeading.textContent = category.name;

        // Add an event listener to the heading to filter products by this category when clicked
        categoryHeading.addEventListener('click', () => {
            filterProducts(category.name);
        });

        categoryDiv.appendChild(categoryHeading);
        productContainer.appendChild(categoryDiv);
    });
}

// Function to filter products by a selected category
function filterProducts(categoryName) {
    const category = stock.categories.find(cat => cat.name === categoryName);
    if (category) {
        displayProducts(category.products);
    } else {
        console.error(`Category "${categoryName}" not found.`);
    }
}

// Function to display products within a specific category
function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const button = document.createElement('button');
        button.textContent = `${product.name}`; 
        //button.classList.add('product-btn');

        const categoryClass = product.category ? product.category.toLowerCase().replace(/\s+/g, '-') : 'category';
        button.classList.add('product-btn', categoryClass);
                
        button.addEventListener('click', () => addToOrder(product));
        container.appendChild(button);
    });
}

// Add product to order
function addToOrder(product) {
    const orderTextarea = document.querySelector('.itemsDescript .order-container-area');
    const totalInput = document.querySelector('.itemsAmountTotal');

    if (orderTextarea) {
        orderTextarea.value += `${product.name} - €${product.price.toFixed(2)}\n`;
    }
    if (totalInput) {
        orderTotal += product.price;
        totalInput.value = `€${orderTotal.toFixed(2)}`;
    }

    items.push(`${product.name} - €${product.price.toFixed(2)}`);
    selectedItemIndex = items.length - 1; // Set new item as the selected one
    updateDisplay(); // Update display to show newly added item
}

// Display items and highlight the selected one
function updateDisplay() {
    const orderContainer = document.querySelector('.itemsDescript .order-container-area');
    if (!orderContainer) {
        console.error("Container element not found");
        return;
    }

    orderContainer.innerHTML = '';

    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = item;
        itemElement.className = 'item';
        
        if (index === selectedItemIndex) {
            itemElement.classList.add('selected');
        }

        orderContainer.appendChild(itemElement);
    });
}


// Page navigation
function openPage(pageName) {
    window.location = `${pageName}.html`;
}

document.addEventListener("DOMContentLoaded", () => {
    snackBar();
    const voidButton = document.getElementById("void-item");
    const upButton = document.getElementById("up-button");
    const downButton = document.getElementById("down-button");

    loadStock(); // Load stock data and initialize display

    // Function to display items and highlight the selected one
    function updateDisplay() {
        const orderInput = document.querySelector('.itemsDescript .order-container-area');
        if (!orderInput) {
            console.error("Textarea element not found");
            return;
        }
        orderInput.value = items
            .map((item, index) => (index === selectedItemIndex ? `[ ${item} ]` : item))
            .join("\n");
    }

    // Event listener for the "void" button to delete the selected item
    voidButton.addEventListener("click", () => {
        if (items.length > 0 && selectedItemIndex !== null) {
            items.splice(selectedItemIndex, 1);

            // Adjust selected index if it's out of range
            if (selectedItemIndex >= items.length) {
                selectedItemIndex = items.length - 1;
            }

            // Recalculate the order total based on remaining items
            orderTotal = items.reduce((total, item) => {
                const price = parseFloat(item.split("€")[1]);
                return total + (price || 0);
            }, 0);

            // Update total amount display
            const totalInput = document.querySelector('.itemsAmountTotal');
            if (totalInput) {
                totalInput.value = `€${orderTotal.toFixed(2)}`;
            }

            updateDisplay();
        }
    });

    // Event listener for the "up" button to navigate up
    upButton.addEventListener("click", () => {
        if (selectedItemIndex > 0) {
            selectedItemIndex--;
            updateDisplay();
        }
    });

    // Event listener for the "down" button to navigate down
    downButton.addEventListener("click", () => {
        if (selectedItemIndex < items.length - 1) {
            console.log(downButton);
            selectedItemIndex++;
            updateDisplay();
        }
    });
});

function snackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", ""); // Hide after 3 seconds
    }, 3000);
}