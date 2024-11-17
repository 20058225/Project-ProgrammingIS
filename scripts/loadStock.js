let stock = {}; // Global variable for stock data
let orderTotal = 0; // Global variable to keep track of the order total
let items = []; // Array to store ordered items
let selectedItemIndex = null; // Index of the currently selected item

// Page navigation
function openPage(pageName) {
    window.location = `${pageName}.html`;
}

document.addEventListener("DOMContentLoaded", () => {
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

        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category', category.name.toLowerCase());

            const categoryHeading = document.createElement('h6');
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

        if (!products || !Array.isArray(products)) {
            console.error("Products array is missing or invalid:", products);
            return;
        }

        products.forEach(product => {
            if (!product || !product.name) {
                console.warn("Invalid product:", product);
                return;
            }
            const button = document.createElement('button');

            // Truncate product name if it exceeds 15 characters
            let buttonText = product.name;
            if (buttonText.length > 20) {
                buttonText = `${buttonText.slice(0, 18)}..`;
            }
            button.textContent = buttonText;

            // Add a fallback category class if `product.category` is missing
            const categoryClass = product.category
                ? product.category.toLowerCase().replace(/\s+/g, '-')
                : 'category';
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

    // Show snackbar notification
    function showSnackbar() {
        const snackbar = document.getElementById("snackbar");
        if (!snackbar) return;

        snackbar.className = "show";
        setTimeout(() => (snackbar.className = ""), 3000);
    }

    // Event listener for the "void" button
    document.getElementById("void-item").addEventListener("click", () => {
        if (items.length > 0 && selectedItemIndex !== null) {
            items.splice(selectedItemIndex, 1);

            // Adjust selected index if it's out of range
            if (selectedItemIndex >= items.length) {
                selectedItemIndex = items.length - 1;
            }

            // Recalculate the order total
            orderTotal = items.reduce((total, item) => {
                const price = parseFloat(item.split("€")[1]);
                return total + (price || 0);
            }, 0);

            const totalInput = document.querySelector('.itemsAmountTotal');
            if (totalInput) {
                totalInput.value = `€${orderTotal.toFixed(2)}`;
            }

            updateDisplay();
        }
    });

    // Navigation buttons
    document.getElementById("up-button").addEventListener("click", () => {
        if (selectedItemIndex > 0) {
            selectedItemIndex--;
            updateDisplay();
        }
    });

    document.getElementById("down-button").addEventListener("click", () => {
        if (selectedItemIndex < items.length - 1) {
            selectedItemIndex++;
            updateDisplay();
        }
    });

    // Cancel all items
    document.getElementById("noSale").addEventListener("click", () => {
        items = [];
        orderTotal = 0;
        selectedItemIndex = null;

        const totalInput = document.querySelector('.itemsAmountTotal');
        if (totalInput) {
            totalInput.value = `€${orderTotal.toFixed(2)}`;
        }

        updateDisplay();
    });

// Open the modal when quantity selection is needed
        // Initialize items and selected index
        let items = []; // Array to store item names and prices
        let selectedItemIndex = null; // To track the currently selected item
       

        // Open the modal when quantity selection is needed
        function openQuantityModal() {
            const modal = document.getElementById("quantityModal");
            const quantityInput = document.getElementById("selectedQuantity");
            quantityInput.value = "0"; // Reset input
            modal.style.display = "block";
        }

        // Close the modal
        function closeQuantityModal() {
            const modal = document.getElementById("quantityModal");
            modal.style.display = "none";
        }

        // Handle number button clicks
        document.querySelectorAll(".num-btn").forEach(button => {
            button.addEventListener("click", event => {
                const value = event.target.dataset.value;
                const quantityInput = document.getElementById("selectedQuantity");
                quantityInput.value = value; // Update the input
            });
        });

        // Confirm the selected quantity
        document.getElementById("confirmQuantity").addEventListener("click", () => {
            const quantityInput = parseInt(document.getElementById("selectedQuantity").value, 10);

            if (isNaN(quantityInput) || quantityInput <= 0) {
                alert("Please select a valid quantity!");
                return;
            }

            multiplySelectedItem(quantityInput);
            closeQuantityModal();
        });

        // Close the modal when "Cancel" is clicked
        document.getElementById("closeModal").addEventListener("click", closeQuantityModal);

        // Multiply the selected item
        function multiplySelectedItem(quantity) {
            if (selectedItemIndex === null || items.length === 0) {
                alert("Please select an item first!");
                return;
            }

            const selectedItem = items[selectedItemIndex];
            const itemPrice = parseFloat(selectedItem.split("€")[1].trim());
            const itemName = selectedItem.split(" - €")[0].trim();

            for (let i = 0; i < quantity; i++) {
                items.push(`${itemName} - €${itemPrice.toFixed(2)}`);
            }

            console.log(items); // For testing purposes
            updateDisplay(); // Update the display 
        }

        // Attach event to "Multiples" button
        document.getElementById("multiply-item").addEventListener("click", () => {
            if (selectedItemIndex === null || items.length === 0) {
                alert("Please select an item first!");
            } else {
                openQuantityModal();
            }
        });

        // Example: Update display function
        function updateDisplay() {
            console.log("Updated items: ", items);
            // Your display logic here
        }






    // Update display
    function updateDisplay() {
        const orderContainer = document.querySelector('.itemsDescript .order-container-area');
        if (!orderContainer) {
            console.error("Order container not found");
            return;
        }

        orderContainer.innerHTML = ''; // Clear previous items

        items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = item;
            itemDiv.className = 'item';

            if (index === selectedItemIndex) {
                itemDiv.classList.add('selected');
            }

            itemDiv.addEventListener('click', () => {
                selectedItemIndex = index;
                updateDisplay();
            });

            orderContainer.appendChild(itemDiv);
        });
    }
    loadStock();
    showSnackbar();
});
