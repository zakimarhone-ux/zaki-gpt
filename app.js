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

  if (!name || !amount) {
    alert("أدخل معلومات المصروف");
    return;
  }

  if (Number(amount) > Number(balance)) {
    alert("الرصيد غير كافي");
    return;
  }

  let expense = {
    name: name,
    amount: Number(amount),
    category: category,
    date: new Date().toLocaleDateString("ar-DZ")
  };

  expenses.unshift(expense);

  balance = Number(balance) - Number(amount);

  saveData();
  updateScreen();
}

function deleteExpense(index) {

  balance = Number(balance) + Number(expenses[index].amount);

  expenses.splice(index,1);

  saveData();
  updateScreen();
}


function updateScreen() {

  let balanceBox = document.getElementById("balance");

  if(balanceBox){
    balanceBox.innerHTML = balance + " DA";
  }


  let list = document.getElementById("expenseList");

  if(list){

    list.innerHTML = "";

    let total = 0;

    expenses.forEach((item,index)=>{

      total += Number(item.amount);

      list.innerHTML += `
      <div class="expense">

      📅 ${item.date}<br>
      🗂️ ${item.category}<br>
      📝 ${item.name}<br>
      💰 ${item.amount} DA

      <button onclick="deleteExpense(${index})">
      حذف
      </button>

      </div>
      `;

    });


    list.innerHTML += `
    <hr>
    📊 مجموع المصاريف: ${total} DA
    `;

  }

}

updateScreen();
