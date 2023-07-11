const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "Color";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

let pointerDown = false;

window.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("gridContainer");
  const gridSlider = document.getElementById("gridSlider");
  const gridValue = document.getElementById("gridValue");
  const colorDiv = document.getElementById("colorDiv");
  const Rainbow = document.getElementById("rainbow");
  const Eraser = document.getElementById("eraser");
  const Color = document.getElementById("color");
  const Clear = document.getElementById("clear");
  const textColor = document.getElementById("textColor");
  const gridColor = document.getElementById("gridColor");
  const menu = document.getElementById("menu");
  const menuContainer = document.getElementById("menuContainer");

  gridSlider.addEventListener("change", changeSize);

  gridValue.addEventListener("input", changeSize);
  Rainbow.addEventListener("click", changeMode);
  Eraser.addEventListener("click", changeMode);
  Color.addEventListener("click", changeMode);
  Clear.addEventListener("click", refreshGrid);
  menu.addEventListener("click", menuMode);
  gridColor.addEventListener("change", setColor);
  textColor.addEventListener("input", setColor);

  Rainbow.textContent = "Rainbow";
  Eraser.textContent = "Eraser";
  Color.textContent = "Color";
  Clear.textContent = "Clear";

  document.body.onpointerdown = () => (pointerDown = true);
  document.body.onpointerup = () => (pointerDown = false);
});
function menuMode() {
  if (menuContainer.classList.contains("opacity-0")) {
    menu.innerHTML = "x";

    menuContainer.classList.remove("opacity-0", "pointer-events-none");
  } else {
    menu.innerHTML = "&#9776";
    menuContainer.classList.add("opacity-0", "pointer-events-none");
  }
}

function setColor(e) {
  let c = e.target.value;
  if (!c.startsWith("#")) {
    c = "#" + c;
  }
  if (c.length > 6) {
    gridColor.value = c;
    currentColor = c;
    textColor.value = c;
  }
  console.log(currentColor);
}

function changeMode(e) {
  const element = document.querySelectorAll(".bg-cyan-400");
  element.forEach((element) => {
    element.classList.remove("bg-cyan-400", "text-white", "border-cyan-400");
    element.classList.add("border-black");
  });
  currentMode = e.target.textContent;
  e.target.classList.remove("border-black");
  e.target.classList.add("bg-cyan-400", "text-white", "border-cyan-400");
  if (currentMode === "Color") {
    textColor.classList.remove("rainbow-color");
    textColor.placeholder = currentColor;
    gridColor.classList.remove("opacity-0");
    gridColor.value = currentColor;
    colorDiv.classList.remove("pointer-events-none", "opacity-50");
  }

  if (currentMode === "Rainbow") {
    textColor.classList.add("rainbow-color");
    textColor.value = "";
    textColor.placeholder = "";
    gridColor.classList.add("opacity-0");
    colorDiv.classList.add("pointer-events-none", "opacity-50");
  }
  if (currentMode === "Eraser") {
    textColor.classList.remove("rainbow-color");
    textColor.placeholder = "#ffffff";
    gridColor.classList.remove("opacity-0");
    gridColor.value = "#ffffff";
    colorDiv.classList.add("pointer-events-none", "opacity-50");
  }
}

function changeSize(e) {
  currentSize = e.target.value;
  if (currentSize > 64) {
    currentSize = 64;
  }
  gridValue.value = currentSize;
  gridSlider.value = currentSize;
  console.log(currentSize);
  cleanGrid();
  setGrid(currentSize);
}
function refreshGrid() {
  cleanGrid();
  setGrid(currentSize);
  if (!menuContainer.classList.contains("opacity-0")) {
    menuMode();
  }
}
function cleanGrid() {
  gridContainer.innerHTML = "";
}

function setGrid(size) {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.addEventListener("pointermove", changeColor);
    gridElement.addEventListener("pointerdown", changeColor);
    gridContainer.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (!menuContainer.classList.contains("opacity-0")) {
    menuMode();
  }
  if (e.type === "pointermove" && !pointerDown) return;
  if (currentMode === "Rainbow") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgba(${r},${g},${b})`;
  } else if (currentMode === "Color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "Eraser") {
    e.target.style.backgroundColor = "#ffffff";
  }
}
window.onload = () => {
  setGrid(DEFAULT_SIZE);
};
