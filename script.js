// Default settings
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

// State variables
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

// DOM Elements
const container = document.querySelector(".container");
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

// Event Listeners for controls
colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Functions
function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
}

function clearGrid() {
    container.innerHTML = '';
}

// MODIFIED: createGrid function now uses flexbox rows (.line)
function createGrid(size) {
    // Calculate the size of each square based on the container's fixed size
    let squareSize = 500 / size;
    
    for (let i = 0; i < size; i++) {
        const line = document.createElement("div");
        line.classList.add("line");
        container.appendChild(line);

        for (let j = 0; j < size; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.height = `${squareSize}px`;
            square.style.width = `${squareSize}px`;

            // Add listeners to each square for drawing
            square.addEventListener('mouseover', changeColor);
            square.addEventListener('mousedown', changeColor);
            line.appendChild(square);
        }
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
    }
}

function activateButton(newMode) {
    // Deactivate the currently active button
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    }

    // Activate the new button
    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
        colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    }
}

// Load the initial grid when the page loads
window.onload = () => {
    createGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
};