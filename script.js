document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("projects-grid")) {
        loadProjects();
    }
    if (document.getElementById("project-title")) {
        loadProjectDashboard();
    }
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) saveProject(file.name);
}

function saveProject(fileName) {
    if (!fileName.trim()) return alert("Invalid file name.");
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    if (projects.some(project => project.name === fileName)) {
        return alert("This file is already uploaded.");
    }

    projects.push({ name: fileName, date: new Date().toLocaleDateString() });
    localStorage.setItem("projects", JSON.stringify(projects));
    loadProjects();
}

function loadProjects() {
    const projectsGrid = document.getElementById("projects-grid");
    projectsGrid.innerHTML = "";
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.sort((a, b) => new Date(b.date) - new Date(a.date));

    projects.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <span class="project-title">${project.name}</span>
            <div class="project-date">${project.date}</div>`;
        projectCard.onclick = () => openDashboard(project.name);
        projectsGrid.appendChild(projectCard);
    });
}

function openDashboard(projectName) {
    window.location.href = `dashboard.html?project=${encodeURIComponent(projectName)}`;
}

function loadProjectDashboard() {
    const params = new URLSearchParams(window.location.search);
    const projectName = params.get("project");

    if (!projectName) {
        alert("No project selected!");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("project-title").textContent = projectName;
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find(p => p.name === projectName);
    if (project) {
        document.getElementById("project-date").textContent = `Created on: ${project.date}`;
    }
}

function goBack() {
    window.location.href = "index.html";
}
