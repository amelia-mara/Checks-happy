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
            
            // ✅ Clicking the swatch opens the system color picker
            swatch.addEventListener("click", function () {
                let colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.value = color; // Set initial value
                colorInput.style.position = "absolute";
                colorInput.style.opacity = 0;

                // ✅ When the user selects a color, update the swatch
                colorInput.addEventListener("input", function () {
                    palette[index] = colorInput.value;
                    swatch.style.backgroundColor = colorInput.value;
                });

                // ✅ Append, trigger the picker, then remove the input
                document.body.appendChild(colorInput);
                colorInput.click();
                colorInput.remove();
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
