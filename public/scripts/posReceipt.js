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

// Event listener for "finishOrder" button
document.getElementById("finishOrder").addEventListener("click", () => {
    const orderContainer = document.querySelector('.order-container-area');
    console.log(orderContainer);
    const items = [];
    let total = 0; // Initialize total

    // Collect all items and calculate total from item prices
    orderContainer.querySelectorAll('.item').forEach(item => {
        const itemText = item.textContent.trim();
        items.push(itemText);
        // Extract price from the item text (assuming price is in the format "Item - €Price")
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
    console.log(orderData);

    // Convert data to JSON
    const orderJSON = JSON.stringify(orderData);
    console.log('Order Data:', orderJSON);

    // Send JSON to server
    fetch('/saveOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: orderJSON,
    })
    .then(response => {
        if (!response.ok) { throw new Error('Network response was not ok'); }
        return response.json();
    })
    .then(data => {
        if (data.orderId) {
            showSnackbar(`Order saved successfully! Order ID: ${data.orderId}`, 'success');
            downloadReceipt(data.orderId, orderData);
            window.location = 'pos.html';
        } else {
            throw new Error('Failed to save order');
        }
    })
    .catch(error => console.error('Error saving order:', error));
});
function downloadReceipt(orderId, orderData) {
    if (!orderData) {
        console.error('Order data is undefined');
        return;
    }
    const content = `
        Receipt for Order: ${orderId}
        Pub: ${orderData.pubName || 'N/A'}
        Address: ${orderData.address || 'N/A'}
        Date: ${orderData.date}
        Time: ${orderData.time}
        Server: ${orderData.serverName}

        Items:
        ${orderData.items.join('\n')}

        Total: €${orderData.total}
        Payment Method: ${orderData.paymentMethod}

        Thank you for your purchase!
    `;
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a temporary <a> element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Set dynamic file name
    link.download = `${orderId}.txt`;
    //link.download = `${orderId}.pdf`;

    // Programmatically click the link to trigger download
    link.click();

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(link.href);
}