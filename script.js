document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
    loadWidgets();
    document.addEventListener("click", closeAllDropdowns);
});

// Function to handle file uploads
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) saveProject(file.name);
}

// Function to save project files
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

// Function to load project files
function loadProjects() {
    const projectsGrid = document.getElementById("projects-grid");
    projectsGrid.innerHTML = "";
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    projects.sort((a, b) => new Date(b.date) - new Date(a.date));

    projects.forEach((project, index) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <div class="project-header">
                <span class="project-title" title="${project.name}">${project.name}</span>
                <div class="dropdown">
                    <button class="dropbtn" onclick="toggleDropdown(event, this)">⋯</button>
                    <div class="dropdown-content">
                        <button onclick="renameProject(${index})">Rename</button>
                        <button onclick="updateScript(${index})">Update Script</button>
                        <button onclick="deleteProject(${index})">Delete</button>
                    </div>
                </div>
            </div>
            <div class="project-date">${project.date}</div>`;
        projectsGrid.appendChild(projectCard);
    });
}

// Function to rename project files
function renameProject(index) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    let newName = prompt("New name:");
    if (newName) {
        projects[index].name = newName;
        localStorage.setItem("projects", JSON.stringify(projects));
        loadProjects();
    }
}

// Function to update script files
function updateScript(index) {
    document.getElementById("file-input").onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            let projects = JSON.parse(localStorage.getItem("projects"));
            projects[index].name = file.name;
            localStorage.setItem("projects", JSON.stringify(projects));
            loadProjects();
        }
    };
    document.getElementById("file-input").click();
}

// Function to delete project files
function deleteProject(index) {
    let projects = JSON.parse(localStorage.getItem("projects"));
    projects.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    loadProjects();
}

// Function to handle dropdowns
function toggleDropdown(event, btn) {
    event.stopPropagation();
    closeAllDropdowns();
    btn.parentElement.classList.toggle("active");
}

function closeAllDropdowns() {
    document.querySelectorAll(".dropdown").forEach(drop => drop.classList.remove("active"));
}

function loadWidgets() {
    let dashboard = document.getElementById("dashboard-widgets");
    dashboard.innerHTML = ""; // Clear existing widgets
    let widgets = JSON.parse(localStorage.getItem("userWidgets")) || [];

    widgets.forEach(widgetData => {
        let widget = document.createElement("div");
        widget.classList.add("widget");
        widget.id = widgetData.id;
        widget.innerHTML = `<span>${widgetData.name}</span>`;

        // Check if it's the Character Breakdown widget and add click event
        if (widgetData.id === "character-breakdown" || widgetData.name.includes("Character Breakdown")) {
            widget.addEventListener("click", () => {
                window.location.href = "character-breakdown.html";
            });
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => removeWidget(widgetData.id);

        widget.appendChild(deleteBtn);
        dashboard.appendChild(widget);
    });
}

    // Ensure event listeners are properly attached after widgets are loaded
    attachWidgetClickEvents();
}

// Function to attach click events to widgets after they are added to the page
function attachWidgetClickEvents() {
    document.querySelectorAll(".widget").forEach(widget => {
        if (widget.textContent.includes("Character Breakdown")) {
            widget.addEventListener("click", () => {
                window.location.href = "character-breakdown.html";
            });
        }
    });
}
