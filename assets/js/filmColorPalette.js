document.addEventListener("DOMContentLoaded", function () {
    const colorSwatches = document.getElementById("colorSwatches");
    const resetButton = document.getElementById("resetPalette");

    let palette = Array(10).fill("#D3D3D3"); // Default placeholder colors

    // ✅ Function to update the swatch UI
    function updateSwatches() {
        colorSwatches.innerHTML = ""; // Clear previous swatches
        palette.forEach((color, index) => {
            let swatch = document.createElement("div");
            swatch.classList.add("swatch");
            swatch.style.backgroundColor = color;

            // ✅ Create hidden color picker for each swatch
            let colorPicker = document.createElement("input");
            colorPicker.type = "color";
            colorPicker.value = color;
            colorPicker.style.opacity = 0;
            colorPicker.style.position = "absolute";
            colorPicker.style.pointerEvents = "none"; // Prevent interference with UI

            // ✅ On Click, Open Color Picker
            swatch.addEventListener("click", function () {
                colorPicker.click();
            });

            // ✅ Update Swatch Color
            colorPicker.addEventListener("input", function () {
                palette[index] = colorPicker.value;
                swatch.style.backgroundColor = colorPicker.value;
            });

            // ✅ Append to swatch
            swatch.appendChild(colorPicker);
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
