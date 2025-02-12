document.addEventListener("DOMContentLoaded", function () {
    const colorWheel = document.getElementById("colorWheel");
    const resetButton = document.getElementById("resetPalette");
    const colorSwatches = document.getElementById("colorSwatches");

    let selectedColor = "#FF5733"; // Default color
    let palette = Array(10).fill("#D3D3D3"); // Default placeholder colors

    // ✅ Function to update the swatch UI
    function updateSwatches() {
        colorSwatches.innerHTML = ""; // Clear previous swatches
        palette.forEach((color, index) => {
            let swatch = document.createElement("div");
            swatch.classList.add("swatch");
            swatch.style.backgroundColor = color;

            // ✅ Allow clicking swatches to change color
            swatch.addEventListener("click", function () {
                palette[index] = selectedColor;
                updateSwatches();
            });

            colorSwatches.appendChild(swatch);
        });
    }

    // ✅ Make the color wheel interactive
    colorWheel.addEventListener("input", function (event) {
        selectedColor = event.target.value;
    });

    // ✅ Reset Palette
    resetButton.addEventListener("click", function () {
        palette = Array(10).fill("#D3D3D3"); // Reset to placeholder colors
        updateSwatches();
    });

    // ✅ Initialize Swatches on Page Load
    updateSwatches();
});
