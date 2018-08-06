let container = document.querySelector('.container');
const CONTAINER_SIZE = container.offsetWidth;
let gridSize;

function makeCell(cellSize) {
	let cell = document.createElement('div');
	cell.style.width = `${cellSize}px`;
	cell.style.height = `${cellSize}px`;
	cell.style.backgroundColor = '#fff';
	cell.style.display = 'inline-block';
	cell.style.border = '1px solid #eee';
	cell.style.boxSizing = 'border-box';
	cell.addEventListener('mouseover', changeCellColor);
	container.appendChild(cell);
}

function changeCellColor() {
	let red = Math.round(Math.random() * 255);
	let green = Math.round(Math.random() * 255);
	let blue = Math.round(Math.random() * 255);
	this.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

function clearGrid() {
	let children = Array.from(container.children);
	children.forEach((child) => {child.remove()});
}

function buildGrid(gridSize) {
	for (let i = 0; i < gridSize; i++) {
		for (let i = 0; i < gridSize; i++) {
			makeCell(CONTAINER_SIZE / gridSize);
		}
	}
}

function resetGrid() {
	clearGrid();
	buildGrid(gridSize);
}

function promptNewGrid() {
	gridSize = prompt('Decide the grid size by inputting a number between 1 and 64.');
	if (gridSize < 0 || gridSize > 64) {
		alert(`You entered ${gridSize}, which is not a valid input.\nInput must be between 1 and 64!`);
		return;
	}
	clearGrid();
	buildGrid(gridSize);
}

buildGrid(16); // Setup a grid on startup