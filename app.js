let projects = JSON.parse(localStorage.getItem("projects")) || [];

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function drawProjects() {

    let container = document.getElementById("projects");

    container.innerHTML = "";

    projects.forEach((project, index) => {

        container.innerHTML += `
        <div class="card">
            <h3>🏗️ ${project.name}</h3>

            <p>💰 الرصيد : ${project.balance} DA</p>

            <p>💸 المصروف : 0 DA</p>

            <p>📅 آخر تحديث : --</p>

        </div>
        `;

    });

}

function newProject(){

    let name = prompt("اسم الشانطي");

    if(!name) return;

    projects.push({
        name:name,
        balance:0
    });

    saveProjects();

    drawProjects();

}

drawProjects();
