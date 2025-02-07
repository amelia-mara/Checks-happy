document.addEventListener("DOMContentLoaded", () => {
    loadProjectDashboard();
    makeWidgetsDraggable();
});

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

    loadWidgetPositions();
}

function goBack() {
    window.location.href = "index.html";
}

function makeWidgetsDraggable() {
    const widgets = document.querySelectorAll(".widget");

    widgets.forEach(widget => {
        widget.onmousedown = function (event) {
            widget.style.position = "absolute";
            widget.style.zIndex = 1000;

            function moveAt(pageX, pageY) {
                widget.style.left = pageX - widget.offsetWidth / 2 + "px";
                widget.style.top = pageY - widget.offsetHeight / 2 + "px";
            }

            moveAt(event.pageX, event.pageY);

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            widget.onmouseup = function () {
                document.removeEventListener("mousemove", onMouseMove);
                widget.onmouseup = null;
                saveWidgetPositions();
            };
        };
    });
}

/* Save Widget Positions */
function saveWidgetPositions() {
    let widgetPositions = {};
    document.querySelectorAll(".widget").forEach(widget => {
        widgetPositions[widget.id] = {
            left: widget.style.left,
            top: widget.style.top
        };
    });
    localStorage.setItem("widgetPositions", JSON.stringify(widgetPositions));
}

/* Load Widget Positions */
function loadWidgetPositions() {
    let widgetPositions = JSON.parse(localStorage.getItem("widgetPositions")) || {};
    document.querySelectorAll(".widget").forEach(widget => {
        if (widgetPositions[widget.id]) {
            widget.style.position = "absolute";
            widget.style.left = widgetPositions[widget.id].left;
            widget.style.top = widgetPositions[widget.id].top;
        }
    });
}
