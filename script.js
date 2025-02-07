document.addEventListener("DOMContentLoaded", () => {
    loadProjectDashboard();
    loadWidgets();
    document.addEventListener("click", closeMenuIfClickedOutside);
});

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
    widget.innerHTML = `<span>${widgetId.replace("-", " ").toUpperCase()}</span>`;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => removeWidget(widgetId);

    widget.appendChild(deleteBtn);
    dashboard.appendChild(widget);

    makeWidgetDraggable(widget);
    makeWidgetResizable(widget);
    saveWidgets();
}

/* Remove widget */
function removeWidget(widgetId) {
    document.getElementById(widgetId)?.remove();
    saveWidgets();
}

/* Dragging Widgets */
function makeWidgetDraggable(widget) {
    let offsetX, offsetY;

    widget.addEventListener("touchstart", startDrag, false);
    widget.addEventListener("mousedown", startDrag, false);

    function startDrag(event) {
        let touch = event.touches ? event.touches[0] : event;
        offsetX = touch.clientX - widget.getBoundingClientRect().left;
        offsetY = touch.clientY - widget.getBoundingClientRect().top;

        document.addEventListener("mousemove", moveWidget, false);
        document.addEventListener("mouseup", stopDrag, false);
    }

    function moveWidget(event) {
        let touch = event.touches ? event.touches[0] : event;
        widget.style.left = touch.clientX - offsetX + "px";
        widget.style.top = touch.clientY - offsetY + "px";
    }

    function stopDrag() {
        document.removeEventListener("mousemove", moveWidget, false);
        document.removeEventListener("mouseup", stopDrag, false);
        saveWidgets();
    }
}

/* Save & load widgets */
function saveWidgets() {
    let widgets = Array.from(document.querySelectorAll(".widget")).map(w => w.id);
    localStorage.setItem("userWidgets", JSON.stringify(widgets));
}

function loadWidgets() {
    JSON.parse(localStorage.getItem("userWidgets") || "[]").forEach(addWidget);
}
