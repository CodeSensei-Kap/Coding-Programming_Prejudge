const transactions = [];
const balanceElement = document.getElementById('current-balance');
const transactionsBody = document.getElementById('transactions-body');
const transactionForm = document.getElementById('transaction-form');
const filterDateInput = document.getElementById('filter-date');
const clearFilterButton = document.getElementById('clear-filter');

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (amount > 0 && date) {
        const transaction = { id: Date.now(), type, amount, category, date };
        transactions.push(transaction);
        updateUI();
    }
});

function updateUI(filterDate = null) {
    let filteredTransactions = transactions;
    if (filterDate) {
        filteredTransactions = transactions.filter((t) => t.date === filterDate);
    }

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

    const balance = transactions.reduce(
        (acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount),
        0
    );

    balanceElement.textContent = balance.toFixed(2);
}

function deleteTransaction(id) {
    const index = transactions.findIndex((t) => t.id === id);
    if (index > -1) {
        transactions.splice(index, 1);
        updateUI();
    }
}

filterDateInput.addEventListener('change', () => {
    updateUI(filterDateInput.value);
});

clearFilterButton.addEventListener('click', () => {
    filterDateInput.value = '';
    updateUI();
});

updateUI();
