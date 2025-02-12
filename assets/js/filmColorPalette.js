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

            // ✅ Attach a color picker directly on click
            swatch.addEventListener("click", function () {
                let colorPicker = document.createElement("input");
                colorPicker.type = "color";
                colorPicker.value = color; // Set initial value
                colorPicker.style.position = "absolute";
                colorPicker.style.opacity = 0;
                colorPicker.style.pointerEvents = "none"; // Prevent blocking interaction

                // ✅ Update color when selected
                colorPicker.addEventListener("input", function () {
                    palette[index] = colorPicker.value;
                    swatch.style.backgroundColor = colorPicker.value;
                });

                // ✅ Append, trigger, then remove after selection
                document.body.appendChild(colorPicker);
                colorPicker.click();

                // ✅ Ensure color updates immediately after closing the picker
                colorPicker.addEventListener("change", function () {
                    palette[index] = colorPicker.value;
                    swatch.style.backgroundColor = colorPicker.value;
                    document.body.removeChild(colorPicker);
                });
            });

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
