const container = document.querySelector(".container");

createGrid(4);

container.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "black";
})

function createGrid(size) {
    let square_size = Math.floor(400 / size);
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