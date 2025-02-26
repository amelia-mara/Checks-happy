document.addEventListener("DOMContentLoaded", function () {
    const colorSwatches = document.getElementById("colorSwatches");
    const resetButton = document.getElementById("resetPalette");

    let palette = Array(10).fill("#D3D3D3"); // Default placeholder colors

    // ✅ Function to update swatch UI
    function updateSwatches() {
        colorSwatches.innerHTML = ""; // Clear previous swatches
        palette.forEach((color, index) => {
            let swatch = document.createElement("div");
            swatch.classList.add("swatch");
            swatch.style.backgroundColor = color;

            // ✅ Create hidden color input inside each swatch
            let colorInput = document.createElement("input");
            colorInput.type = "color";
            colorInput.style.opacity = 0;
            colorInput.style.position = "absolute";
            colorInput.style.width = "0";
            colorInput.style.height = "0";

            // ✅ Clicking the swatch opens the color picker
            swatch.addEventListener("click", function () {
                colorInput.click();
            });

            // ✅ When a color is selected, update the swatch
            colorInput.addEventListener("input", function () {
                palette[index] = colorInput.value;
                swatch.style.backgroundColor = colorInput.value;
            });

            swatch.appendChild(colorInput);
            colorSwatches.appendChild(swatch);
        });
    }

    // ✅ Reset Palette
    resetButton.addEventListener("click", function () {
        palette = Array(10).fill("#D3D3D3"); // Reset to placeholder colors
        updateSwatches();
    });

    // ✅ Initialize Swatches on Page Load
    updateSwatches();
});
