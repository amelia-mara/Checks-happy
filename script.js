document.addEventListener("DOMContentLoaded", () => {
    loadProjectDashboard();
    loadWidgets();
    document.addEventListener("click", closeMenuIfClickedOutside);
});

const GRID_SIZE = 220; // Grid size
const COLUMN_COUNT = 3; // Number of columns in the grid

/* Go back to main page */
function goBack() {
    window.location.href = "index.html";
}

/* Toggle widget menu */
function toggleMenu(event) {
    let menu = document.getElementById("widget-menu");

    if (menu.style.display === "block") {
        closeMenu();
    } else {
        menu.style.display = "block";
        setTimeout(() => document.addEventListener("click", closeMenuIfClickedOutside), 10);
    }

    event.stopPropagation();
}

/* Close menu if clicking outside */
function closeMenuIfClickedOutside(event) {
    let menu = document.getElementById("widget-menu");
    let button = document.querySelector(".menu-btn");

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        closeMenu();
    }
}

/* Close the menu */
function closeMenu() {
    let menu = document.getElementById("widget-menu");
    menu.style.display = "none";
    document.removeEventListener("click", closeMenuIfClickedOutside);
}

/* Add widget */
function addWidget(widgetId) {
    let dashboard = document.getElementById("dashboard-widgets");
    if (document.getElementById(widgetId)) return;

    let widget = document.createElement("div");
    widget.classList.add("widget");
    widget.id = widgetId;
    widget.innerHTML = `<span>${widgetId.replace("-", " ").toUpperCase()}</span>`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => removeWidget(widgetId);

    widget.appendChild(deleteBtn);
    dashboard.appendChild(widget);

    placeWidgetInGrid(widget);
    makeWidgetDraggable(widget);
    saveWidgets();
}

/* Remove widget */
function removeWidget(widgetId) {
    document.getElementById(widgetId)?.remove();
    saveWidgets();
}

/* Place widget in first available grid slot */
function placeWidgetInGrid(widget) {
    let occupiedPositions = getOccupiedPositions();
    
    for (let row = 0; row < 10; row++) { // Max 10 rows
        for (let col = 0; col < COLUMN_COUNT; col++) {
            let key = `${col}-${row}`;
            if (!occupiedPositions[key]) {
                widget.style.left = col * GRID_SIZE + "px";
                widget.style.top = row * GRID_SIZE + "px";
                saveWidgets();
                return;
            }
        }
    }
}

/* Get occupied grid positions */
function getOccupiedPositions() {
    let occupied = {};
    document.querySelectorAll(".widget").forEach(widget => {
        let col = Math.round(parseInt(widget.style.left) / GRID_SIZE);
        let row = Math.round(parseInt(widget.style.top) / GRID_SIZE);
        occupied[`${col}-${row}`] = true;
    });
    return occupied;
}

/* Save & load widgets */
function saveWidgets() {
    let widgets = [];
    document.querySelectorAll(".widget").forEach(widget => {
        widgets.push({
            id: widget.id,
            left: widget.style.left,
            top: widget.style.top
        });
    });
    localStorage.setItem("userWidgets", JSON.stringify(widgets));
}

function loadWidgets() {
    let savedWidgets = JSON.parse(localStorage.getItem("userWidgets")) || [];
    savedWidgets.forEach(widgetData => {
        addWidget(widgetData.id);
        let widget = document.getElementById(widgetData.id);
        if (widget) {
            widget.style.left = widgetData.left;
            widget.style.top = widgetData.top;
        }
    });
}
