const container = document.querySelector(".container");
createGrid(16);

function createGrid(num_of_squares) {
    for (let i = 0; i < num_of_squares; i++) {
        const line = document.createElement("div");
        line.classList.add("line");
        container.appendChild(line);
        for (let j = 0; j < num_of_squares; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            line.appendChild(square);
        }
    }
}