let projects = JSON.parse(localStorage.getItem("projects")) || [];
let currentProject = Number(localStorage.getItem("currentProject"));

let project = projects[currentProject];

if (!project.expenses) project.expenses = [];
if (!project.balance) project.balance = 0;

const projectName = document.getElementById("projectName");
const initialBalance = document.getElementById("initialBalance");
const totalExpenses = document.getElementById("totalExpenses");
const remainingBalance = document.getElementById("remainingBalance");

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const addExpense = document.getElementById("addExpense");
const balanceInput = document.getElementById("balanceInput");
const saveBalance = document.getElementById("saveBalance");

const table = document.getElementById("expensesTable");

projectName.textContent = project.name;

function save() {
    projects[currentProject] = {
        ...project
    };

    localStorage.setItem("projects", JSON.stringify(projects));

    project = projects[currentProject];
}

function updateTotals() {

    let total = 0;

    project.expenses.forEach((exp, index) => {
        total += Number(exp.amount);
    });

    initialBalance.textContent = project.balance + " DA";
    totalExpenses.textContent = total + " DA";
    remainingBalance.textContent = (project.balance - total) + " DA";
}

function renderExpenses() {

    table.innerHTML = "";

    project.expenses.forEach((exp) => {

        table.innerHTML += `
<tr>
    <td>${exp.date}</td>
    <td>${exp.name}</td>
    <td>${exp.category}</td>
    <td>${exp.amount} DA</td>

    <td>
        <button onclick="editExpense(${index})">✏️</button>
    </td>

    <td>
        <button onclick="deleteExpense(${index})">🗑️</button>
    </td>

</tr>
`;

    });

    updateTotals();
}

balanceInput.value = project.balance;

saveBalance.onclick = function () {

    if (balanceInput.value.trim() === "") {
        alert("اكتب الرصيد أولاً");
        return;
    }

    project.balance = Number(balanceInput.value);

    projects[currentProject] = project;

    localStorage.setItem("projects", JSON.stringify(projects));

    renderExpenses();

    alert("تم حفظ الرصيد");

};
addExpense.onclick = function () {

    if (expenseName.value.trim() === "" || expenseAmount.value.trim() === "")
        return;

    project.expenses.push({

        name: expenseName.value,

        amount: Number(expenseAmount.value),

        category: expenseCategory.value,

        date: new Date().toLocaleDateString("ar-DZ")

    });

    expenseName.value = "";
    expenseAmount.value = "";

    save();

    renderExpenses();

};

renderExpenses();
function deleteExpense(index){

    if(!confirm("هل تريد حذف هذا المصروف؟")) return;

    project.expenses.splice(index,1);

    save();

    renderExpenses();

}

function editExpense(index){

    expenseName.value = project.expenses[index].name;

    expenseAmount.value = project.expenses[index].amount;

    expenseCategory.value = project.expenses[index].category;

    project.expenses.splice(index,1);

    save();

    renderExpenses();
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
}
