let projects = JSON.parse(localStorage.getItem("projects")) || [];

const projectsDiv = document.getElementById("projects");
const addBtn = document.getElementById("addProject");
const search = document.getElementById("search");

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects(filter = "") {

    projectsDiv.innerHTML = "";

    let list = projects.filter(p =>
        p.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (list.length === 0) {
        projectsDiv.innerHTML =
        "<p style='text-align:center'>لا توجد شانطيات.</p>";
        return;
    }

    list.forEach((project, index) => {

        projectsDiv.innerHTML += `
        <div class="card">
            <h3>🏗️ ${project.name}</h3>
            <p>💰 الرصيد : ${project.balance} DA</p>
        </div>
        `;

    });

}

addBtn.onclick = function () {

    let name = prompt("اسم الشانطي");

    if (!name) return;

    projects.push({
        name: name,
        balance: 0
    });

    saveProjects();

    renderProjects();

};

search.oninput = function () {
    renderProjects(this.value);
};

renderProjects();
