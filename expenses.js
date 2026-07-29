let projects = JSON.parse(localStorage.getItem("projects")) || [];
let currentProject = Number(localStorage.getItem("currentProject"));

let project = projects[currentProject];

const projectName = document.getElementById("projectName");
const balance = document.getElementById("balance");
const table = document.getElementById("expensesTable");

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const addExpense = document.getElementById("addExpense");

if (!project.expenses) {
    project.expenses = [];
}

projectName.textContent = project.name;

function updateBalance() {

    let total = 0;

    project.expenses.forEach(e => {
        total += Number(e.amount);
    });

    balance.textContent = total + " DA";

}

function renderExpenses() {

    table.innerHTML = "";

    project.expenses.forEach(e => {

        table.innerHTML += `
        <tr>
            <td>${e.date}</td>
            <td>${e.name}</td>
            <td>${e.category}</td>
            <td>${e.amount} DA</td>
        </tr>
        `;

    });

    updateBalance();

}

addExpense.onclick = function () {

    if (expenseName.value === "" || expenseAmount.value === "") return;

    project.expenses.push({

        name: expenseName.value,

        amount: Number(expenseAmount.value),

        category: expenseCategory.value,

        date: new Date().toLocaleDateString("ar-DZ")

    });

    projects[currentProject] = project;

    localStorage.setItem("projects", JSON.stringify(projects));

    expenseName.value = "";
    expenseAmount.value = "";

    renderExpenses();

};

renderExpenses();
