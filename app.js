let projects = JSON.parse(localStorage.getItem("projects")) || [];

const projectsDiv = document.getElementById("projects");
const addBtn = document.getElementById("addProject");
const search = document.getElementById("search");

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects(filter = "") {

    projectsDiv.innerHTML = "";

    const list = projects.filter(project =>
        project.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (list.length === 0) {
        projectsDiv.innerHTML = `
            <p style="text-align:center;padding:20px;color:#777">
                لا توجد شانطيات
            </p>
        `;
        return;
    }

    list.forEach(project => {

        const realIndex = projects.indexOf(project);

        projectsDiv.innerHTML += `
            <div class="card" onclick="openProject(${realIndex})">
                <h3>🏗️ ${project.name}</h3>
                <p>💰 الرصيد : ${project.balance} DA</p>
            </div>
        `;

    });

}

addBtn.addEventListener("click", () => {

    const name = prompt("اسم الشانطي");

    if (!name || name.trim() === "") return;

    projects.push({
        name: name.trim(),
        balance: 0,
        expenses: []
    });

    saveProjects();

    renderProjects(search.value);

});

search.addEventListener("input", () => {
    renderProjects(search.value);
});

function openProject(index) {

    localStorage.setItem("currentProject", index);

    window.location.href = "chantier.html";

}

renderProjects();
