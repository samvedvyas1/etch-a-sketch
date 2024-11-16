const container = document.querySelector(".container");
const btn = document.querySelector(".btn");

createGrid(64);

btn.addEventListener("click", () => {
    let size = prompt("Size");
    if (size === null) {
        return;
    }
    while (size === undefined || (size > 100) || (size < 1)) {
        size = prompt('Re-enter valid size:');
        if (size === null) {
            return;
        }
        else if ((size > 0) && (size < 101)) {
            break;
        }
    }
    clearGrid();
    createGrid(size);
})

container.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "black";
    console.log(e.target);
})

function createGrid(size) {
    let square_size = 400 / size;
    for (let i = 0; i < size; i++) {
        const line = document.createElement("div");
        line.classList.add("line");
        container.appendChild(line);
        for (let j = 0; j < size; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.height = square.style.width = square_size + "px";
            line.appendChild(square);
        }
    }
}

function clearGrid() {
    const lines = document.querySelectorAll(".line");
    const squares = document.querySelectorAll(".square");
    lines.forEach((line) => {
        container.removeChild(line);
    })
}