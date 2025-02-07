document.addEventListener("DOMContentLoaded", () => {
    loadProjectDashboard();
    loadWidgets();
    document.addEventListener("click", closeMenuIfClickedOutside);
});

const GRID_SIZE = 220; // Grid spacing to match iPad layout

/* Go back to main page */
function goBack() {
    window.location.href = "index.html";
}

/* Toggle widget menu */
function toggleMenu() {
    let menu = document.getElementById("widget-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

/* Close menu if clicking outside */
function closeMenuIfClickedOutside(event) {
    let menu = document.getElementById("widget-menu");
    let button = document.querySelector(".menu-btn");

    if (menu.style.display === "block" && !menu.contains(event.target) && !button.contains(event.target)) {
        menu.style.display = "none";
    }
}

/* Add widget */
function addWidget(widgetId) {
    let dashboard = document.getElementById("dashboard-widgets");
    if (document.getElementById(widgetId)) return;

    let widget = document.createElement("div");
    widget.classList.add("widget");
    widget.id = widgetId;
    widget.style.left = "0px";
    widget.style.top = "0px";
    widget.innerHTML = `<span>${widgetId.replace("-", " ").toUpperCase()}</span>`;

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

/* Make widgets draggable with smooth grid snapping */
function makeWidgetDraggable(widget) {
    let offsetX, offsetY, startX, startY;

    widget.addEventListener("touchstart", startDrag, false);
    widget.addEventListener("mousedown", startDrag, false);

    function startDrag(event) {
        event.preventDefault();

        let touch = event.touches ? event.touches[0] : event;
        startX = touch.clientX;
        startY = touch.clientY;
        offsetX = touch.clientX - widget.getBoundingClientRect().left;
        offsetY = touch.clientY - widget.getBoundingClientRect().top;

        document.addEventListener("mousemove", moveWidget, false);
        document.addEventListener("mouseup", stopDrag, false);
        document.addEventListener("touchmove", moveWidget, false);
        document.addEventListener("touchend", stopDrag, false);
    }

    function moveWidget(event) {
        let touch = event.touches ? event.touches[0] : event;
        let x = touch.clientX - offsetX;
        let y = touch.clientY - offsetY;

        // Snap to grid
        widget.style.left = Math.round(x / GRID_SIZE) * GRID_SIZE + "px";
        widget.style.top = Math.round(y / GRID_SIZE) * GRID_SIZE + "px";
    }

    function stopDrag() {
        document.removeEventListener("mousemove", moveWidget, false);
        document.removeEventListener("mouseup", stopDrag, false);
        document.removeEventListener("touchmove", moveWidget, false);
        document.removeEventListener("touchend", stopDrag, false);
        saveWidgets();
    }
}

/* Save & load widget positions */
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
