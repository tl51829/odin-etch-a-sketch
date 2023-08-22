function createGrid(size) {
    let dimension = 500 /size;

    for (let i = 0; i < (size * size); i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.cssText = `width: ${dimension}px; height: ${dimension}px`;
        container.appendChild(box);
    }
}

function removeGrid() {
    boxes.forEach((box) => {
        box.remove();
    });
}


const container = document.querySelector('#container');

// Create default grid and allow drawing on it
let currentSize = 16;
createGrid(currentSize);

let boxes = document.querySelectorAll('.box');
boxes.forEach((box) => {
    box.addEventListener('mouseover', (e) => {
        box.style.backgroundColor = "#777777";
    });
});

// Change size of grid and allow drawing on it
const sizeSetting = document.querySelector('#size');

sizeSetting.addEventListener('click', (e) => {
    outer: while (true) {
        size = Number(prompt(`Please enter an integer not more than 100 for the dimension of the grid (Current dimension ${currentSize} x ${currentSize}):`, currentSize));

        switch (true) {
            case size <= 100 && size > 0:
                break outer;
            default:
                break;
        }
    }
    
    size = Math.round(size);
    currentSize = size;

    removeGrid();
    createGrid(currentSize);

    boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('mouseover', (e) => {
            let active = document.querySelector(".active");
            if (active.textContent === "Rainbow color!") {
                box.style.backgroundColor = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
            } else {
                box.style.backgroundColor = '#777777';
            }
        });
    });
});

// Clear the grid (set color to white)
const clear = document.getElementById('clear');

clear.addEventListener('click', (e) => {
    boxes.forEach((box) => {
        box.style.backgroundColor = "#dddddd";
    });
});

// Convert color of brush back to black (original color)
const black = document.getElementById('black');
const rainbow = document.getElementById('rainbow');

black.classList.add('active');

black.addEventListener('click', (e) => {
    boxes.forEach((box) => {
        box.addEventListener('mouseover', (e) => {
            box.style.backgroundColor = '#777777';
        });
    });
    
    black.classList.add('active');
    rainbow.classList.remove('active');
});

// Convert color of brush from black to rainbow :D
function getRandomNumber() {
    /* Return a random integer from 0 to 255 inclusively */
    return Math.floor(Math.random() * 256);
}

rainbow.addEventListener('click', (e) => {
    boxes.forEach((box) => {
        box.addEventListener('mouseover', (e) => {
            box.style.backgroundColor = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
        });

        rainbow.classList.add('active');
        black.classList.remove('active');
    }); 
});