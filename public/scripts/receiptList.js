// Function to display the receipts in a list
/*function showReceipts() {
    const receiptsContainer = document.getElementById("receiptsContainer");
    receiptsContainer.innerHTML = ""; // Clear previous list

    receiptsData.forEach((receipt) => {
        const listItem = document.createElement("div");
        listItem.className = "receipt-item";
        listItem.textContent = `Receipt #${receipt.id} - Total: ${receipt.total}`;
        listItem.addEventListener("click", () => showReceiptDetails(receipt));
        receiptsContainer.appendChild(listItem);
    });
}*/
function showReceipts() {
    if (!receiptsData || !Array.isArray(receiptsData)) {
        console.error('No receipts data available');
        return;
    }

    const receiptsContainer = document.getElementById('receipts-container');
    receiptsContainer.innerHTML = receiptsData
        .map(
            (receipt) => `
            <div class="receipt-item">
                <p>Order ID: ${receipt.orderId}</p>
                <p>Date: ${receipt.date}</p>
                <p>Total: €${receipt.total}</p>
            </div>
        `
        )
        .join('');
}

// Function to show receipt details in a modal
function showReceiptDetails(receipt) {
    const modal = document.getElementById("receiptModal");
    const modalContent = document.getElementById("modalContent");

    modalContent.innerHTML = `
        <h2>Receipt #${receipt.id}</h2>
        <p><strong>Server:</strong> ${receipt.serverName}</p>
        <p><strong>Total:</strong> ${receipt.total}</p>
        <p><strong>Payment Method:</strong> ${receipt.paymentMethod}</p>
        <p><strong>Date:</strong> ${new Date(receipt.timestamp).toLocaleString()}</p>
        <ul>
            ${receipt.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;

    modal.style.display = "block";
}

// Close the modal
document.getElementById("closeModalButton").addEventListener("click", () => {
    document.getElementById("receiptModal").style.display = "none";
});