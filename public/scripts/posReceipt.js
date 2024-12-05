/* ***************************** @@ menu-container @@ ***************************** */

// Function to update date and time every minute
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    document.getElementById("openDate").textContent = formattedDate;
    document.getElementById("timeSeat").textContent = formattedTime;
}

// Update time every minute
setInterval(updateDateTime, 1000);

// Initial call to set the time immediately
updateDateTime();

// Set the server name (you'll need to replace this with actual logic to get the server's name)
document.getElementById("userName").textContent = "Server Name";
/* ***************************** @@ menu-container @@ ***************************** */

// Disable the "finishOrder" button initially
document.getElementById("finishOrder").disabled = true;

// Return to product view when "closePaymentView" is clicked
document.getElementById("closePaymentView").addEventListener("click", () => {
    document.getElementById("selectedProductsView").classList.add("hidden");
    document.getElementById("productWrapper").classList.remove("hidden");
    document.getElementById("btnDescript").classList.remove("hidden");
    document.getElementById("itemsSetUp").classList.remove("hidden");
    document.getElementById("category-navigation").classList.remove("hidden");
});
// Add click event listeners to payment options
document.querySelectorAll('.payment-options button').forEach(button => {
    button.addEventListener('click', (event) => {
        const paymentMethod = event.target.dataset.method; //console.log(`Payment processed with ${paymentMethod}`);
        
        // Remove 'paySelected' class from all buttons
        document.querySelectorAll('.payment-options button').forEach(btn => {
            btn.classList.remove('paySelected');
        });

        // Add 'paySelected' class to clicked button
        event.target.classList.add('paySelected');

        // Enable the finish order button
        document.getElementById("finishOrder").disabled = false;
    });
});
// Function to calculate order total
function calculateOrderTotal() {
    let total = 0;
    document.querySelectorAll('.item').forEach(item => {
        const price = parseFloat(item.dataset.price); // Ensure price is stored in a dataset attribute
        const quantity = parseInt(item.dataset.quantity); // Likewise for quantity
        total += price * quantity;
    });
    return total.toFixed(2);
}

document.getElementById("finishOrder").addEventListener("click", () => {
    const orderContainer = document.querySelector('.order-container-area');
    const items = [];
    let total = 0; // Initialize total

    // Collect all items and calculate total from item prices
    orderContainer.querySelectorAll('.item').forEach(item => {
        const itemText = item.textContent.trim();
        items.push(itemText);
        const priceMatch = itemText.match(/€(\d+\.\d{2})/);
        if (priceMatch) {
            total += parseFloat(priceMatch[1]);
        }
    });

    // Structure the data
    const now = new Date();
    const orderData = {
        items: items,
        total: total.toFixed(2),
        timestamp: now.toISOString(),
        paymentMethod: document.querySelector('.payment-options button.paySelected').dataset.method,
        serverName: document.getElementById("userName").textContent,
        pubName: "Your Pub Name", // Replace with actual pub name
        address: "Your Pub Address", // Replace with actual address
        date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    // Send JSON to server
    fetch('/saveOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to save order');
        return response.json();
    })
    .then(data => {
        showSnackbar(`Order saved successfully! Order ID: ${data.orderId}`, 'success');
        setTimeout(() => {
            window.location = 'pos.html'; 
        }, 2000);
    })
    .catch(error => console.error('Error saving order:', error));
});
function showSnackbar(message, type, snackbarId = "snackbar") {
    createSnackbar(snackbarId); // Ensure snackbar exists
    const snackbar = document.getElementById(snackbarId);

    if (!snackbar) { console.error("Snackbar element not found!"); return; }

    snackbar.style.backgroundColor = type === 'success' ? '#2ECC71' : '#E74C3C';
    
    snackbar.innerHTML = message;
    snackbar.classList.add("show");

    setTimeout(() => {
        snackbar.classList.add("hide");
    }, 2000);

    setTimeout(() => {
        snackbar.classList.remove("show", "hide");
    }, 2500);
}   
function createSnackbar(snackbarId) {
    if (!document.getElementById(snackbarId)) {
        const snackbar = document.createElement('div');
        snackbar.id = snackbarId;
        snackbar.classList.add('snackbar');
        document.body.appendChild(snackbar);
    }
}