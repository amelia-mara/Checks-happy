document.addEventListener("DOMContentLoaded", function () {
    // Select necessary elements
    const colorWheel = document.getElementById("colorWheel");
    const addColorButton = document.getElementById("addColor");
    const resetButton = document.getElementById("resetPalette");
    const colorSwatches = document.getElementById("colorSwatches");

    // Default color and placeholder swatches
    let selectedColor = "#FF5733"; 
    let palette = Array(5).fill("#D3D3D3"); // Default placeholder colors

    // ✅ Make the color wheel interactive
    colorWheel.addEventListener("input", function (event) {
        selectedColor = event.target.value;
    });

    // ✅ Add selected color to the swatch grid
    addColorButton.addEventListener("click", function () {
        palette.shift(); // Remove the first color
        palette.push(selectedColor); // Add new color
        updateSwatches();
    });

    // ✅ Reset the color palette to default placeholders
    resetButton.addEventListener("click", function () {
        palette = Array(5).fill("#D3D3D3"); // Reset colors
        updateSwatches();
    });

    // ✅ Function to update swatches
    function updateSwatches() {
        colorSwatches.innerHTML = ""; // Clear previous swatches
        palette.forEach((color) => {
            let swatch = document.createElement("div");
            swatch.classList.add("swatch");
            swatch.style.backgroundColor = color;
            colorSwatches.appendChild(swatch);
        });
    }

    // ✅ Initial update to display placeholder colors
    updateSwatches();
});
