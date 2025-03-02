// Define variables and constants to store transactions, update UI elements, and handle user interactions
const transactions = [];
const balanceElement = document.getElementById('current-balance');
const transactionsBody = document.getElementById('transactions-body');
const transactionForm = document.getElementById('transaction-form');
const filterDateInput = document.getElementById('filter-date');
const clearFilterButton = document.getElementById('clear-filter');

// Event listener to handle form submission for adding transactions
// Allows users to input income or expense details including type, amount, category, and date
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    // Ensure amount is a valid positive number and date is selected
    if (amount > 0 && date) {
        const transaction = { id: Date.now(), type, amount, category, date };
        transactions.push(transaction);
        updateUI();
    }
});
// Function to update the UI, optionally filtering by date
// Displays the list of transactions and updates the account balance
function updateUI(filterDate = null) {
    let filteredTransactions = transactions;
    if (filterDate) {
        filteredTransactions = transactions.filter((t) => t.date === filterDate);
    }

    // Clear existing transaction rows before updating the list
    transactionsBody.innerHTML = '';
    filteredTransactions.forEach((t) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.type}</td>
            <td>$${t.amount.toFixed(2)}</td>
            <td>${t.category}</td>
            <td>${t.date}</td>
            <td>
                <button onclick="deleteTransaction(${t.id})">Delete</button>
            </td>
        `;
        transactionsBody.appendChild(row);
    });

    // Calculate and update the balance
    // Adds income amounts and subtracts expense amounts
    const balance = transactions.reduce(
        (acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount),
        0
    );

    balanceElement.textContent = balance.toFixed(2);
}

// Function to delete a transaction by ID
// Allows users to remove incorrect or outdated entries
function deleteTransaction(id) {
    const index = transactions.findIndex((t) => t.id === id);
    if (index > -1) {
        transactions.splice(index, 1);
        updateUI();
    }
}

// Event listener to filter transactions by selected date
// Helps users view income and expenses for a specific day
filterDateInput.addEventListener('change', () => {
    updateUI(filterDateInput.value);
});

// Event listener to clear the date filter and show all transactions
// Resets the filter input and refreshes the transaction list
clearFilterButton.addEventListener('click', () => {
    filterDateInput.value = '';
    updateUI();
});

// Initial UI update on page load
// Ensures the balance and transaction history are correctly displayed
updateUI();
