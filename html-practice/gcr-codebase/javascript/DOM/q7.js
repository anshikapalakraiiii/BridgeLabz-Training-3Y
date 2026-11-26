// Q7: Detect Mouse Path & Coordinates Logger

const box = document.getElementById("box");
const coordinates = document.getElementById("coordinates");
const trailLine = document.getElementById("trail-line");
const clearButton = document.getElementById("clear-button");

const MAX_TRAIL_POINTS = 80;   // keep the path short so it stays light
let trailPoints = [];

// Convert page-level mouse coordinates into coordinates INSIDE the box
function getPositionInsideBox(event) {
  const boxRect = box.getBoundingClientRect();
  return { x: event.clientX - boxRect.left, y: event.clientY - boxRect.top };
}

// ---- Live coordinates + mouse path ----
box.addEventListener("mousemove", (event) => {
  coordinates.textContent = `clientX: ${event.clientX}, clientY: ${event.clientY}`;

  // Record the path as an SVG polyline
  const { x, y } = getPositionInsideBox(event);
  trailPoints.push(`${x},${y}`);
  if (trailPoints.length > MAX_TRAIL_POINTS) trailPoints.shift();
  trailLine.setAttribute("points", trailPoints.join(" "));
});

box.addEventListener("mouseleave", () => {
  coordinates.textContent = "clientX: -, clientY: - (mouse is outside the box)";
});

// ---- Double-click: drop a red dot at the click position ----
box.addEventListener("dblclick", (event) => {
  const { x, y } = getPositionInsideBox(event);

  const dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = `${x}px`;   // CSS translate(-50%, -50%) centres the dot on the cursor
  dot.style.top = `${y}px`;
  box.appendChild(dot);
});

// ---- Clear helper ----
clearButton.addEventListener("click", () => {
  box.querySelectorAll(".dot").forEach((dot) => dot.remove());
  trailPoints = [];
  trailLine.setAttribute("points", "");
});