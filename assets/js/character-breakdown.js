document.addEventListener("DOMContentLoaded", function() {
    loadCharacters(); // Load existing characters on page load

    // 🎨 Film Colour Palette Functionality
    const colourPickerContainer = document.getElementById("colourPickerContainer");
    const colourPicker = document.getElementById("colourPicker");
    const addColourBtn = document.getElementById("addColourBtn");
    const confirmColourBtn = document.getElementById("confirmColourBtn");
    const colourSwatches = document.getElementById("colourSwatches");

    let selectedColours = JSON.parse(localStorage.getItem("filmPalette")) || [];

    // Function to update the swatch display
    function updateSwatches() {
        colourSwatches.innerHTML = ""; // Clear previous swatches

        selectedColours.forEach((colour) => {
            const swatch = document.createElement("div");
            swatch.classList.add("colour-swatch");
            swatch.style.backgroundColor = colour;

            const label = document.createElement("div");
            label.classList.add("colour-label");
            label.textContent = colour.toUpperCase(); // Show hex code

            // Remove colour on click
            swatch.addEventListener("click", function() {
                selectedColours = selectedColours.filter(c => c !== colour);
                localStorage.setItem("filmPalette", JSON.stringify(selectedColours)); // Save updated colours
                updateSwatches();
            });

            swatch.appendChild(label);
            colourSwatches.appendChild(swatch);
        });

        // Save updated palette to local storage
        localStorage.setItem("filmPalette", JSON.stringify(selectedColours));
    }

    // 🎨 Open Colour Picker Pop-Up when "Add Colour" is clicked
    addColourBtn.addEventListener("click", function() {
        colourPickerContainer.style.display = "block"; // Show pop-up
    });

    // ✅ When "Confirm Colour" is clicked, add the selected colour to the palette
    confirmColourBtn.addEventListener("click", function() {
        const selectedColour = colourPicker.value; // Get the chosen colour

        if (!selectedColours.includes(selectedColour)) {
            selectedColours.push(selectedColour);
            updateSwatches(); // Update swatches immediately after confirming
        }

        colourPickerContainer.style.display = "none"; // Hide pop-up
    });

    // Load saved colours when the page loads
    updateSwatches();
});
