document.addEventListener("DOMContentLoaded", () => {
    loadProjectDashboard();
    loadWidgets();
});

/* Load project info */
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

/* Go back to the main page */
function goBack() {
    window.location.href = "index.html";
}

/* Toggle widget menu */
function toggleMenu() {
    let menu = document.getElementById("widget-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

/* Add widget to the dashboard */
function addWidget(widgetId) {
    let dashboard = document.getElementById("dashboard-widgets");

    if (document.getElementById(widgetId)) return; // Prevent duplicates

    let widget = document.createElement("div");
    widget.classList.add("widget");
    widget.id = widgetId;
    widget.textContent = widgetId.replace("-", " ").toUpperCase();
    
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => removeWidget(widgetId);

    widget.appendChild(deleteBtn);
    dashboard.appendChild(widget);
    
    makeWidgetDraggable(widget);
    saveWidgets();
}

/* Remove widget */
function removeWidget(widgetId) {
    document.getElementById(widgetId)?.remove();
    saveWidgets();
}

/* Make widgets draggable */
function makeWidgetDraggable(widget) {
    widget.style.position = "absolute";
    widget.addEventListener("touchstart", startDrag, false);
    widget.addEventListener("mousedown", startDrag, false);
}

function startDrag(event) {
    event.preventDefault();
    let widget = event.target.closest(".widget");
    if (!widget) return;

    let shiftX = event.type === "touchstart" ? event.touches[0].clientX - widget.getBoundingClientRect().left : event.clientX - widget.getBoundingClientRect().left;
    let shiftY = event.type === "touchstart" ? event.touches[0].clientY - widget.getBoundingClientRect().top : event.clientY - widget.getBoundingClientRect().top;

    function onMove(event) {
        let pageX = event.type.includes("touch") ? event.touches[0].clientX : event.clientX;
        let pageY = event.type.includes("touch") ? event.touches[0].clientY : event.clientY;
        widget.style.left = pageX - shiftX + "px";
        widget.style.top = pageY - shiftY + "px";
    }

    function stopMove() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", stopMove);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", stopMove);
        saveWidgets();
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", stopMove);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", stopMove);
}

/* Save & load widgets */
function saveWidgets() {
    let widgets = Array.from(document.querySelectorAll(".widget")).map(w => w.id);
    localStorage.setItem("userWidgets", JSON.stringify(widgets));
}

function loadWidgets() {
    let savedWidgets = JSON.parse(localStorage.getItem("userWidgets")) || [];
    savedWidgets.forEach(addWidget);
}
