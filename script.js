const BLACK_COLOR = 'BLACK';
const RANDOM_COLOR = 'RANDOM';
const R_PERCENT_COLOR = 'RANDOM PERCENTWISE';
let container = document.querySelector('.container');
const CONTAINER_SIZE = container.offsetWidth;
let gridSize = 16; // default value
let currColorStrat = BLACK_COLOR;

function makeCell(cellSize) {
	let cell = document.createElement('div');
	cell.style.width = `${cellSize}px`;
	cell.style.height = `${cellSize}px`;
	cell.style.display = 'inline-block';
	cell.style.border = '1px solid #eee';
	cell.style.boxSizing = 'border-box';
	cell.addEventListener('mouseover', (event) => {
		changeCellColor(event.target, currColorStrat)});
	container.appendChild(cell);
}

function changeCellColor(element, colorStrat) {
	let red;
	let green;
	let blue;

	if (colorStrat === BLACK_COLOR) {
		red = 0;
		green = 0;
		blue = 0;
	} else if (colorStrat === RANDOM_COLOR) {
		red = Math.round(Math.random() * 255);
		green = Math.round(Math.random() * 255);
		blue = Math.round(Math.random() * 255);
	} 
	// TO DO: implement percentwise coloring 
	else if (colorStrat === R_PERCENT_COLOR) {
		let backgroundColor = element.style.backgroundColor;
		if (!backgroundColor) {
			red = Math.round(Math.random() * 255);
			green = Math.round(Math.random() * 255);
			blue = Math.round(Math.random() * 255);
		} else {
			let rgbValues = extractRGBValues(backgroundColor);
			let newValues = changeRGBColor(rgbValues);
			red = newValues[0];
			green = newValues[1];
			blue = newValues[2];
		}
	}
	element.style.backgroundColor = `rgb(${red},${green},${blue})`;
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

function toggleColor() {
	let button = document.querySelector('.toggleButton');
	if (currColorStrat === BLACK_COLOR) {
		currColorStrat = RANDOM_COLOR;
	} else if (currColorStrat === RANDOM_COLOR) {
		currColorStrat = R_PERCENT_COLOR;
	} 
	else if (currColorStrat === R_PERCENT_COLOR) {
		currColorStrat = BLACK_COLOR;
	} 
	button.textContent = `Color strategy: ${currColorStrat}`;
}

function extractRGBValues(rgbString){
	let reg = /\D/;
	let numberArr = rgbString.split(reg);
	let rgbValues = [];
	for (let i = 0; i < numberArr.length; i++){
	  	if(numberArr[i]){
			rgbValues.push(Number(numberArr[i]));
	  	}
	}
	return rgbValues;
}

function changeRGBColor(rgbValues) {
	let percentage = 0.25; // Percentage to darken color on hover
	let changedValues = [];
	let change = Math.ceil(255 * percentage);
	for (let i = 0; i < rgbValues.length; i++) {
		changedValues[i] = rgbValues[i] - change;
		if (changedValues[i] < 0) {
			changedValues[i] = 0;
		}
	}
	return changedValues;
}

buildGrid(gridSize); // Setup a 16x16 grid on startup