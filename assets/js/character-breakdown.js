document.addEventListener("DOMContentLoaded", function () {
    const characterForm = document.getElementById("character-form");
    const characterList = document.getElementById("character-list");
    const addCharacterBtn = document.getElementById("addCharacter");

    addCharacterBtn.addEventListener("click", function () {
        // ✅ Capture form data
        const name = document.getElementById("character-name").value;
        const actor = document.getElementById("actor-name").value;
        const age = document.getElementById("character-age").value;
        const skinTone = document.getElementById("skin-tone").value;
        const hairType = document.getElementById("hair-type").value;
        const specialRequirements = document.getElementById("special-requirements").value;
        const imageInput = document.getElementById("character-image");

        // ✅ Validate name and actor fields
        if (!name || !actor) {
            alert("Please enter a character name and actor name!");
            return;
        }

        // ✅ Create Character Card
        const card = document.createElement("div");
        card.classList.add("character-card");

        // ✅ Placeholder Image or Uploaded Image
        const img = document.createElement("img");
        if (imageInput.files.length > 0) {
            img.src = URL.createObjectURL(imageInput.files[0]);
        } else {
            img.src = "assets/images/placeholder.png"; // Default Placeholder
        }

        // ✅ Character Info
        const info = document.createElement("div");
        info.classList.add("character-info");
        info.innerHTML = `<strong>${name}</strong><br>Actor: ${actor}<br>Age: ${age}`;

        // ✅ Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-character");
        deleteBtn.innerHTML = "❌";
        deleteBtn.addEventListener("click", function () {
            characterList.removeChild(card);
        });

        // ✅ Append Elements
        card.appendChild(deleteBtn);
        card.appendChild(img);
        card.appendChild(info);
        characterList.appendChild(card);

        // ✅ Clear Form
        characterForm.reset();
    });
});
