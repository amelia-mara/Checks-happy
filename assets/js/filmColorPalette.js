document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Film Color Palette Loaded!");

    // Get elements
    const colorWheel = document.getElementById("colorWheel");
    const coreColor = document.getElementById("coreColor");
    const colorSwatches = document.getElementById("colorSwatches");
    const resetButton = document.getElementById("resetPalette");

    if (!colorWheel || !coreColor || !colorSwatches || !resetButton) {
        console.error("❌ Missing elements in HTML!");
        return;
    }

    let palette = Array(5).fill("#D3D3D3"); // Default placeholder colors

    // ✅ Update core color from the color wheel
    colorWheel.addEventListener("input", function (event) {
        let selectedColor = event.target.value;
        coreColor.style.backgroundColor = selectedColor;
        updatePalette(selectedColor);
    });

    // ✅ Update swatches
    function updatePalette(newColor) {
        palette.shift(); // Remove the first color
        palette.push(newColor); // Add new color
        updateSwatches();
    }

    // ✅ Update the UI with swatches
    function updateSwatches() {
        colorSwatches.innerHTML = ""; // Clear previous swatches
        palette.forEach((color) => {
            let swatch = document.createElement("div");
            swatch.classList.add("swatch");
            swatch.style.backgroundColor = color;
            swatch.addEventListener("click", function () {
                colorWheel.value = color;
                coreColor.style.backgroundColor = color;
            });
            colorSwatches.appendChild(swatch);
        });
    }

    // ✅ Reset Palette
    resetButton.addEventListener("click", function () {
        palette = Array(5).fill("#D3D3D3");
        coreColor.style.backgroundColor = "#D3D3D3";
        updateSwatches();
    });

    // ✅ Initial update
    updateSwatches();
});
