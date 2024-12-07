let globalReceiptsData = [];

async function fetchReceipts() {
    try {
        const response = await fetch('api/receipts');
        if (!response.ok) {
            throw new Error('Failed to fetch receipts');
        }

        globalReceiptsData = await response.json(); // Store fetched data
        console.log('Global receipts data set: ', globalReceiptsData);

        // Now call `showReceipts()` only after the data is fetched
        // You could call showReceipts here directly, or later when the modal is opened
    } catch (error) {
        console.error('Error fetching receipts:', error);
    }
}

function showReceipts(receiptsData) {
    console.log('Received receipts data:', receiptsData); // Log data received

    const modalListContent = document.getElementById('modalListContent');
    modalListContent.innerHTML = ''; // Clear existing content

    if (!receiptsData || receiptsData.length === 0) {
        modalListContent.innerHTML = '<p>No receipts available.</p>';
        return;
    }

    receiptsData.forEach(receipt => {
        modalListContent.innerHTML += `
            <div class="receiptListItem">
                <p><strong>Order ID:</strong> ${receipt.orderId} | <strong>Date:</strong> ${receipt.date} | <strong>Total:</strong> ${receipt.total}</p>
            </div>`;
    });

    console.log('Modal content populated:', modalListContent.innerHTML);
}

document.getElementById('showReceipts').addEventListener('click', () => {
    const modal = document.getElementById('receiptListModal');
    modal.classList.remove('hidden');
    console.log('Modal is now visible');
    
    // Call showReceipts with the globalReceiptsData when the modal is opened
    showReceipts(globalReceiptsData);
});

document.getElementById('closeModalButton').addEventListener('click', () => {
    const modal = document.getElementById('receiptListModal');
    modal.classList.add('hidden');
    console.log('Modal is now hidden');
});

// Fetch receipts when the page loads (or wherever appropriate)
fetchReceipts();
