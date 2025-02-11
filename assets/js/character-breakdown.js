document.addEventListener("DOMContentLoaded", function () {
    const characterForm = document.getElementById("character-form");
    const characterList = document.getElementById("character-list");
    const addCharacterButton = document.getElementById("addCharacter");

    // Default placeholder image (Update path if needed)
    const defaultImage = "assets/img/placeholder.jpg";

    // Function to add a character
    function addCharacter() {
        const name = document.getElementById("character-name").value.trim();
        const actor = document.getElementById("actor-name").value.trim();
        const age = document.getElementById("character-age").value.trim();
        const skinTone = document.getElementById("skin-tone").value.trim();
        const hairType = document.getElementById("hair-type").value.trim();
        const specialReq = document.getElementById("special-requirements").value.trim();
        const imageInput = document.getElementById("character-image").files[0];

        if (!name || !actor || !age) {
            alert("Please fill in all required fields.");
            return;
        }

        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        // Create Image Element
        const image = document.createElement("img");
        if (imageInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                image.src = e.target.result;
            };
            reader.readAsDataURL(imageInput);
        } else {
            image.src = defaultImage;
        }
        characterCard.appendChild(image);

        // Create Info Container
        const info = document.createElement("div");
        info.classList.add("character-info");
        info.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>Actor: ${actor}</p>
            <p>Age: ${age}</p>
            <p>Skin Tone: ${skinTone}</p>
            <p>Hair Type: ${hairType}</p>
            <p>Special: ${specialReq}</p>
        `;
        characterCard.appendChild(info);

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-character");
        deleteBtn.innerHTML = "❌";
        deleteBtn.addEventListener("click", () => {
            characterCard.remove();
        });
        characterCard.appendChild(deleteBtn);

        characterList.appendChild(characterCard);

        // Reset Form
        characterForm.reset();
    }

    // Attach Event Listener
    addCharacterButton.addEventListener("click", addCharacter);
});
