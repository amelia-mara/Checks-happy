document.addEventListener("DOMContentLoaded", function () {
    const characterForm = document.getElementById("character-form");
    const characterList = document.getElementById("character-list");
    const addCharacterButton = document.getElementById("addCharacter");
    const uploadHeadshot = document.getElementById("uploadHeadshot");
    const headshotPreview = document.getElementById("headshotPreview");
    const generateLookButton = document.getElementById("generateLook");
    const productList = document.getElementById("productList");
    const pinterestInput = document.getElementById("pinterestBoard");
    const loadPinterestButton = document.getElementById("loadPinterest");

    const defaultImage = "assets/img/placeholder.jpg";

    function addCharacter() {
        const name = document.getElementById("character-name").value.trim();
        const actor = document.getElementById("actor-name").value.trim();
        const age = document.getElementById("character-age").value.trim();
        const notes = document.getElementById("character-notes").value.trim();
        const sensitivity = document.getElementById("character-sensitivity").value.trim();
        const requirements = document.getElementById("character-requirements").value.trim();
        const imageInput = uploadHeadshot.files[0];

        if (!name || !actor || !age) {
            alert("Please fill in all required fields.");
            return;
        }

        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

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

        const info = document.createElement("div");
        info.classList.add("character-info");
        info.innerHTML = `
            <p><strong>${name}</strong></p>
            <p>Actor: ${actor}</p>
            <p>Age: ${age}</p>
            <p>Notes: ${notes}</p>
            <p>Allergies & Sensitivities: ${sensitivity}</p>
            <p>Special Requirements: ${requirements}</p>
        `;
        characterCard.appendChild(info);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-character");
        deleteBtn.innerHTML = "❌";
        deleteBtn.addEventListener("click", () => {
            characterCard.remove();
        });
        characterCard.appendChild(deleteBtn);

        characterList.appendChild(characterCard);
        characterForm.reset();
    }

    addCharacterButton.addEventListener("click", addCharacter);

    uploadHeadshot.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                headshotPreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Headshot" style="width: 100%; border-radius: 10px;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    generateLookButton.addEventListener("click", function () {
        alert("AI-generated look feature is coming soon!");
    });

    loadPinterestButton.addEventListener("click", function () {
        const boardURL = pinterestInput.value.trim();
        if (!boardURL) {
            alert("Please enter a Pinterest Board URL.");
            return;
        }
        alert("Loading images from: " + boardURL);
    });
});
