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

            // ✅ Attach single-click event
            swatch.addEventListener("click", function () {
                openColorPicker(index, swatch);
            });

            colorSwatches.appendChild(swatch);
        });
    }

    // ✅ Function to open color picker and update swatch color
    function openColorPicker(index, swatch) {
        let colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.value = palette[index];
        colorPicker.style.position = "fixed";
        colorPicker.style.left = "-9999px"; // Move it off-screen (iOS bug workaround)
        document.body.appendChild(colorPicker);

        // ✅ iOS Fix: Use focus() before click()
        colorPicker.focus();
        colorPicker.click();

        // ✅ Update swatch color instantly
        colorPicker.addEventListener("input", function () {
            palette[index] = colorPicker.value;
            swatch.style.backgroundColor = colorPicker.value;
        });

        // ✅ Remove picker after selection
        colorPicker.addEventListener("change", function () {
            document.body.removeChild(colorPicker);
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
