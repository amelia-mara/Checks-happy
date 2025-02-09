document.addEventListener("DOMContentLoaded", loadCharacters);

// Function to add a new character
function addCharacter() {
    let name = document.getElementById("character-name").value.trim();
    let actor = document.getElementById("actor-name").value.trim();
    let age = document.getElementById("character-age").value.trim();
    let skinTone = document.getElementById("skin-tone").value.trim();
    let hairType = document.getElementById("hair-type").value.trim();
    let specialReq = document.getElementById("special-requirements").value.trim();
    let imageFile = document.getElementById("character-image").files[0];

    if (!name || !actor) {
        alert("Character Name and Actor Name are required.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let imageData = e.target.result;

        let characters = JSON.parse(localStorage.getItem("characters")) || [];
        characters.push({
            name,
            actor,
            age,
            skinTone,
            hairType,
            specialReq,
            image: imageData
        });

        localStorage.setItem("characters", JSON.stringify(characters));
        loadCharacters();
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        let characters = JSON.parse(localStorage.getItem("characters")) || [];
        characters.push({
            name,
            actor,
            age,
            skinTone,
            hairType,
            specialReq,
            image: null
        });

        localStorage.setItem("characters", JSON.stringify(characters));
        loadCharacters();
    }

    // Clear form fields after adding
    document.getElementById("character-name").value = "";
    document.getElementById("actor-name").value = "";
    document.getElementById("character-age").value = "";
    document.getElementById("skin-tone").value = "";
    document.getElementById("hair-type").value = "";
    document.getElementById("special-requirements").value = "";
    document.getElementById("character-image").value = "";
}

// Function to load characters from localStorage
function loadCharacters() {
    let characterContainer = document.getElementById("character-profiles");
    characterContainer.innerHTML = "";

    let characters = JSON.parse(localStorage.getItem("characters")) || [];

    characters.forEach((character, index) => {
        let characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        characterCard.innerHTML = `
            <div class="character-info">
                <h3>${character.name} (${character.actor})</h3>
                <p><strong>Age:</strong> ${character.age}</p>
                <p><strong>Skin Tone:</strong> ${character.skinTone}</p>
                <p><strong>Hair Type:</strong> ${character.hairType}</p>
                <p><strong>Special Requirements:</strong> ${character.specialReq}</p>
                ${character.image ? `<img src="${character.image}" alt="${character.name}">` : ""}
                <button onclick="deleteCharacter(${index})">Delete</button>
            </div>
        `;

        characterContainer.appendChild(characterCard);
    });
}

// Function to delete a character
function deleteCharacter(index) {
    let characters = JSON.parse(localStorage.getItem("characters")) || [];
    characters.splice(index, 1);
    localStorage.setItem("characters", JSON.stringify(characters));
    loadCharacters();
}

// Film Color Palette Functionality
document.addEventListener("DOMContentLoaded", function() {
    const colorPicker = document.getElementById("colorPicker");
    const addColorBtn = document.getElementById("addColorBtn");
    const colorSwatches = document.getElementById("colorSwatches");

    let selectedColors = JSON.parse(localStorage.getItem("filmPalette")) || [];

    // Function to update the swatch display with drag-and-drop functionality
    function updateSwatches() {
        colorSwatches.innerHTML = ""; // Clear previous swatches

        selectedColors.forEach((color, index) => {
            const swatch = document.createElement("li"); // Use <li> instead of <div>
            swatch.classList.add("color-swatch");
            swatch.style.backgroundColor = color;
            swatch.setAttribute("data-index", index);
            swatch.setAttribute("draggable", true);
            swatch.title = `Click to remove ${color}`;

            // Remove color on click
            swatch.addEventListener("click", function() {
                selectedColors = selectedColors.filter(c => c !== color);
                updateSwatches();
            });

            // Drag Events for Sorting
            swatch.addEventListener("dragstart", handleDragStart);
            swatch.addEventListener("dragover", handleDragOver);
            swatch.addEventListener("drop", handleDrop);
            swatch.addEventListener("dragend", handleDragEnd);

            colorSwatches.appendChild(swatch);
        });

        // Save updated palette to local storage
        localStorage.setItem("filmPalette", JSON.stringify(selectedColors));
    }

    // Drag & Drop Functions
    let draggedItem = null;

    function handleDragStart(e) {
        draggedItem = this;
        setTimeout(() => this.style.opacity = "0.5", 0);
    }

    function handleDragOver(e) {
        e.preventDefault(); // Required to allow dropping
    }

    function handleDrop(e) {
        e.preventDefault();
        if (this !== draggedItem) {
            let draggedIndex = parseInt(draggedItem.getAttribute("data-index"));
            let targetIndex = parseInt(this.getAttribute("data-index"));

            // Swap colors in the array
            let temp = selectedColors[draggedIndex];
            selectedColors[draggedIndex] = selectedColors[targetIndex];
            selectedColors[targetIndex] = temp;

            // Update swatches after reordering
            updateSwatches();
        }
    }

    function handleDragEnd() {
        this.style.opacity = "1"; // Reset opacity after dragging
    }

    // Function to add a new color
    addColorBtn.addEventListener("click", function() {
        const selectedColor = colorPicker.value;

        if (!selectedColors.includes(selectedColor)) {
            selectedColors.push(selectedColor);
            updateSwatches();
        }
    });

    // Load saved colors on page load
    updateSwatches();
});
