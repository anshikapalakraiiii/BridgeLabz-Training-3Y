// Q5: Image Gallery with Modal Preview

const gallery = document.getElementById("gallery");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");

// To keep the project self-contained (no internet needed), the 6 "photos" are
// generated as SVG images. Replace `makeImage()` with real URLs if you prefer.
const pictures = [
  { title: "Sunrise",  colors: ["#fbbf24", "#ef4444"] },
  { title: "Ocean",    colors: ["#38bdf8", "#1e3a8a"] },
  { title: "Forest",   colors: ["#4ade80", "#14532d"] },
  { title: "Twilight", colors: ["#c084fc", "#312e81"] },
  { title: "Desert",   colors: ["#fcd34d", "#b45309"] },
  { title: "Glacier",  colors: ["#e0f2fe", "#0891b2"] },
];

// Returns a data: URL for a gradient SVG of the requested size
function makeImage(title, [startColor, endColor], width, height) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${startColor}"/>
          <stop offset="1" stop-color="${endColor}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" fill="white" font-family="Arial" font-size="${height / 8}"
            text-anchor="middle" dominant-baseline="middle">${title}</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Build the 6 thumbnails; the bigger version's URL is stored in data-full
pictures.forEach((picture) => {
  const thumbnail = document.createElement("img");
  thumbnail.src = makeImage(picture.title, picture.colors, 300, 200);
  thumbnail.alt = picture.title;
  thumbnail.dataset.full = makeImage(picture.title, picture.colors, 900, 600);
  gallery.appendChild(thumbnail);
});

function openModal(imageElement) {
  modalImage.src = imageElement.dataset.full;
  modalImage.alt = imageElement.alt;
  modalCaption.textContent = imageElement.alt;
  overlay.hidden = false;
}

function closeModal() {
  overlay.hidden = true;
  modalImage.src = "";
}

// Event delegation: one click listener on the grid
gallery.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") openModal(event.target);
});

// Clicking the dark background (overlay) closes the modal
overlay.addEventListener("click", closeModal);

// Clicking INSIDE the modal bubbles up to the overlay, which would close it.
// stopPropagation() stops the event here, so the overlay never sees it.
modal.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Bonus: Escape key closes the modal
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) closeModal();
});