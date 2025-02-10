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

        selectedColours.forEach((colour, index) => {
            const swatch = document.createElement("div");
            swatch.classList.add("colour-swatch");
            swatch.style.backgroundColor = colour;

            const label = document.createElement("div");
            label.classList.add("colour-label");
            label.textContent = colour.toUpperCase(); // Show hex code

            // Remove colour on click
            swatch.addEventListener("click", function() {
                selectedColours = selectedColours.filter(c => c !== colour);
                updateSwatches();
            });

            swatch.appendChild(label);
            colourSwatches.appendChild(swatch);
        });

        // Save updated palette to local storage
        localStorage.setItem("filmPalette", JSON.stringify(selectedColours));
    }

    // When "Add Colour" is clicked, open the colour picker pop-up
    addColourBtn.addEventListener("click", function() {
        colourPickerContainer.style.display = "block"; // Show the pop-up
    });

    // When the user confirms a colour, add it to the swatches
    confirmColourBtn.addEventListener("click", function() {
        const selectedColour = colourPicker.value;

        if (!selectedColours.includes(selectedColour)) {
            selectedColours.push(selectedColour);
            updateSwatches();
        }

        colourPickerContainer.style.display = "none"; // Hide the pop-up after confirming
    });

    // Load saved colours when the page loads
    updateSwatches();
});
