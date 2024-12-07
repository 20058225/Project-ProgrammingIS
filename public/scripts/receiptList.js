async function fetchReceipts() {
    try {
        const response = await fetch('/api/receipts');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const receiptsData = await response.json(); // Now the response is JSON
        showReceipts(receiptsData);
    } catch (error) {
        console.error('Error fetching receipts:', error);
    }
}


// Function to display the receipts in a list
function showReceipts(receiptsData) {
    const receiptsContainer = document.getElementById('receiptContainer');

    if (!receiptsData || receiptsData.length === 0) {
        receiptsContainer.innerHTML = '<p>No receipts available</p>';
        return;
    }

    receiptsContainer.innerHTML = receiptsData
        .map(
            (receipt) => `
            <div class="receiptListItem">
                <p><strong>Order ID:</strong> ${receipt.orderId}</p>
                <p><strong>Date:</strong> ${receipt.date}</p>
                <p><strong>Total:</strong> ${receipt.total}</p>
            </div>
        `
        )
        .join('');

    document.querySelectorAll('.receiptListItem').forEach((item, index) => {
        item.addEventListener('click', () => {
            showReceiptDetails(receiptsData[index]);
        });
    });
}

// Call fetchReceipts when the DOM is ready or button is clicked
document.addEventListener('DOMContentLoaded', fetchReceipts);

// Function to show receipt details in a modal
function showReceiptDetails(receipt) {
    //document.getElementById("receiptListModal").classList.remove("hidden");
    const modal = document.getElementById("receiptListModal");
    const modalContent = document.getElementById("modalListContent");

    modalContent.innerHTML = `
        <h2>Receipt #${receipt.orderId}</h2>
        <p><strong>Server:</strong> ${receipt.serverName}</p>
        <p><strong>Total:</strong> ${receipt.total}</p>
        <p><strong>Payment Method:</strong> ${receipt.paymentMethod}</p>
        <p><strong>Date:</strong> ${new Date(receipt.timestamp).toLocaleString()}</p>
        <ul>
            ${receipt.items.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;

    modal.classList.remove('hidden');
}

// Close the modal
document.getElementById("closeModalButton").addEventListener("click", () => {
    document.getElementById("receiptListModal").classList.add('hidden');
});
document.getElementById("showReceipts").addEventListener("click", () => {
    document.getElementById("receiptContainer").classList.remove('hidden');
});