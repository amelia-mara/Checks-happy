document.addEventListener("DOMContentLoaded", function () {
    const resetButton = document.getElementById("resetPalette");
    const colorSwatches = document.getElementById("colorSwatches");

    let palette = Array(10).fill("#D3D3D3"); // Default placeholder colors (10 swatches)

    // ✅ Create a hidden color input element
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.style.display = "none"; // Hide the color picker initially
    document.body.appendChild(colorPicker); // Add it to the document

    // ✅ Function to update the swatch UI
    function updateSwatches() {
        colorSwatches.innerHTML = ""; // Clear previous swatches
        palette.forEach((color, index) => {
            let swatch = document.createElement("div");
            swatch.classList.add("swatch");
            swatch.style.backgroundColor = color;

            // ✅ Click a swatch to open the color picker
            swatch.addEventListener("click", function () {
                colorPicker.click(); // Open the hidden color picker

                // ✅ Update the swatch color when a color is selected
                colorPicker.oninput = function () {
                    palette[index] = colorPicker.value; // Update swatch color
                    updateSwatches(); // Refresh the UI
                };
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
