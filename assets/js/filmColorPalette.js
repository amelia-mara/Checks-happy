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

            // ✅ Attach single-click event for color picker
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
        colorPicker.value = palette[index]; // Set initial color
        colorPicker.style.position = "absolute";
        colorPicker.style.opacity = 0;
        colorPicker.style.pointerEvents = "none"; // Prevent interaction blocking

        // ✅ Update swatch color instantly when a color is picked
        colorPicker.addEventListener("input", function () {
            palette[index] = colorPicker.value;
            swatch.style.backgroundColor = colorPicker.value;
        });

        // ✅ Append to body, trigger click, then remove after selection
        document.body.appendChild(colorPicker);
        colorPicker.click();

        // ✅ Ensure the picker disappears after selecting a color
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
