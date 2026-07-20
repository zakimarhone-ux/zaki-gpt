// الرصيد
let balance = Number(localStorage.getItem("balance")) || 0;

// قائمة المصاريف
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// حفظ البيانات
function saveData() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

console.log("التطبيق يعمل بنجاح");
