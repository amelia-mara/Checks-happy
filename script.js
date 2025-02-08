document.addEventListener("DOMContentLoaded", () => {
    loadWidgets();
    document.addEventListener("click", closeMenuIfClickedOutside);
});

const GRID_SIZE = 220; // Size of each widget grid slot
const COLUMN_COUNT = 3; // Number of columns in the grid

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

function closeMenuIfClickedOutside(event) {
    let menu = document.getElementById("widget-menu");
    let button = document.querySelector(".menu-btn");

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        closeMenu();
    }
}

function closeMenu() {
    let menu = document.getElementById("widget-menu");
    menu.style.display = "none";
    document.removeEventListener("click", closeMenuIfClickedOutside);
}

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

function removeWidget(widgetId) {
    document.getElementById(widgetId)?.remove();
    saveWidgets();
}

function placeWidgetInGrid(widget) {
    let occupiedPositions = getOccupiedPositions();
    
    for (let row = 0; row < 10; row++) { 
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

function getOccupiedPositions() {
    let occupied = {};
    document.querySelectorAll(".widget").forEach(widget => {
        let col = Math.round(parseInt(widget.style.left) / GRID_SIZE);
        let row = Math.round(parseInt(widget.style.top) / GRID_SIZE);
        occupied[`${col}-${row}`] = true;
    });
    return occupied;
}

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

        let col = Math.round(x / GRID_SIZE);
        let row = Math.round(y / GRID_SIZE);

        let occupiedPositions = getOccupiedPositions();

        if (!occupiedPositions[`${col}-${row}`]) {
            widget.style.left = col * GRID_SIZE + "px";
            widget.style.top = row * GRID_SIZE + "px";
        }
    }

    function stopDrag() {
        document.removeEventListener("mousemove", moveWidget, false);
        document.removeEventListener("mouseup", stopDrag, false);
        document.removeEventListener("touchmove", moveWidget, false);
        document.removeEventListener("touchend", stopDrag, false);
        saveWidgets();
    }
}

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
