document.addEventListener("DOMContentLoaded", () => {
    loadProjectDashboard();
    makeWidgetsDraggable();
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

    loadWidgetPositions();
}

/* Go back to the main page */
function goBack() {
    window.location.href = "index.html";
}

/* Make widgets draggable (for both mouse & touch) */
function makeWidgetsDraggable() {
    const widgets = document.querySelectorAll(".widget");

    widgets.forEach(widget => {
        widget.style.position = "absolute"; // Ensures the widgets can be moved freely
        widget.addEventListener("touchstart", startDrag, false);
        widget.addEventListener("mousedown", startDrag, false);
    });

    function startDrag(event) {
        event.preventDefault();

        let widget = event.target.closest(".widget");
        if (!widget) return;

        let shiftX, shiftY;

        if (event.type === "touchstart") {
            let touch = event.touches[0];
            shiftX = touch.clientX - widget.getBoundingClientRect().left;
            shiftY = touch.clientY - widget.getBoundingClientRect().top;

            document.addEventListener("touchmove", onMove, false);
            document.addEventListener("touchend", stopMove, false);
        } else {
            shiftX = event.clientX - widget.getBoundingClientRect().left;
            shiftY = event.clientY - widget.getBoundingClientRect().top;

            document.addEventListener("mousemove", onMove, false);
            document.addEventListener("mouseup", stopMove, false);
        }

        function onMove(event) {
            let pageX = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
            let pageY = event.type === "touchmove" ? event.touches[0].clientY : event.clientY;

            widget.style.left = pageX - shiftX + "px";
            widget.style.top = pageY - shiftY + "px";
        }

        function stopMove() {
            document.removeEventListener("mousemove", onMove, false);
            document.removeEventListener("mouseup", stopMove, false);
            document.removeEventListener("touchmove", onMove, false);
            document.removeEventListener("touchend", stopMove, false);
            saveWidgetPositions();
        }
    }
}

/* Save widget positions */
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

/* Load widget positions on page refresh */
function loadWidgetPositions() {
    let widgetPositions = JSON.parse(localStorage.getItem("widgetPositions")) || {};
    document.querySelectorAll(".widget").forEach(widget => {
        if (widgetPositions[widget.id]) {
            widget.style.left = widgetPositions[widget.id].left;
            widget.style.top = widgetPositions[widget.id].top;
        }
    });
}
