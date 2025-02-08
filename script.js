document.addEventListener("DOMContentLoaded", () => {
    loadWidgets();
});

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
    saveWidgets();
}

function removeWidget(widgetId) {
    document.getElementById(widgetId)?.remove();
    saveWidgets();
}

function saveWidgets() {
    let widgets = [];
    document.querySelectorAll(".widget").forEach(widget => {
        widgets.push({ id: widget.id });
    });
    localStorage.setItem("userWidgets", JSON.stringify(widgets));
}

function loadWidgets() {
    let savedWidgets = JSON.parse(localStorage.getItem("userWidgets")) || [];
    savedWidgets.forEach(widgetData => {
        addWidget(widgetData.id);
    });
}
