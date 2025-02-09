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
