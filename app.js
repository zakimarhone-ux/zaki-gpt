let balance = localStorage.getItem("balance") || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addBalance(amount) {
  balance = Number(balance) + Number(amount);
  saveData();
  updateScreen();
}

function addExpense(name, amount, category) {
  if (Number(amount) > balance) {
    alert("الرصيد غير كافي");
    return;
  }

  let expense = {
    name: name,
    amount: Number(amount),
    category: category,
    date: new Date().toLocaleDateString()
  };

  expenses.push(expense);
  balance = Number(balance) - Number(amount);

  saveData();
  updateScreen();
}

function deleteExpense(index) {
  balance = Number(balance) + Number(expenses[index].amount);
  expenses.splice(index, 1);
  saveData();
  updateScreen();
}

function updateScreen() {
  let balanceBox = document.getElementById("balance");
  if (balanceBox) {
    balanceBox.innerHTML = balance + " DA";
  }

  let list = document.getElementById("expenseList");

  if (list) {
    list.innerHTML = "";

    expenses.forEach((item, index) => {
      list.innerHTML += `
      <div>
      ${item.date} - ${item.category}
      <br>
      ${item.name}: ${item.amount} DA
      <button onclick="deleteExpense(${index})">حذف</button>
      </div>
      `;
    });
  }
}

updateScreen();
