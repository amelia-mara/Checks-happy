document.addEventListener("DOMContentLoaded", function () {
    const uploadHeadshot = document.getElementById("uploadHeadshot");
    const headshotPreview = document.getElementById("headshotPreview");
    const faceCanvas = document.getElementById("faceCanvas");
    const ctx = faceCanvas.getContext("2d");

    // ✅ Handle Image Upload
    uploadHeadshot.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    headshotPreview.style.backgroundImage = `url(${img.src})`;
                    headshotPreview.textContent = "";
                    // Draw image on canvas
                    ctx.drawImage(img, 0, 0, faceCanvas.width, faceCanvas.height);
                };
            };
            reader.readAsDataURL(file);
        }
    });

    // ✅ Handle Reset Button
    document.getElementById("resetFaceChart").addEventListener("click", function () {
        ctx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
        headshotPreview.style.backgroundImage = "";
        headshotPreview.textContent = "No Image Uploaded";
    });
});
