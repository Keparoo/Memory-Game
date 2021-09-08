const gameContainer = document.getElementById('game');

// const COLORS = [
// 	'red',
// 	'blue',
// 	'green',
// 	'orange',
// 	'purple',
// 	'red',
// 	'blue',
// 	'green',
// 	'orange',
// 	'purple'
// ];

const COLORPAIR = [
	'red',
	'blue',
	'green',
	'orange',
	'purple',
	'gray',
	'lightblue',
	'lime',
	'magenta',
	'chartreuse'
];

let color1 = '';
let firstSquare = null;
let secondSquare = null;
let numPairs;
let numMatches = 0;
let gameOver = true;
let scoreEl = document.querySelector('#score');
scoreEl.innerText = numMatches;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let highScoreEl = document.querySelector('#highScore');
highScoreEl.innerText = highScore;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		const newDiv = document.createElement('div');
		newDiv.classList.add(color);
		newDiv.addEventListener('click', handleCardClick);
		gameContainer.append(newDiv);
	}
}

function handleCardClick(event) {
	console.log('you just clicked', event.target);
	if (secondSquare) {
		return;
	}
	event.target.removeEventListener('click', handleCardClick);
	event.target.style.backgroundColor = event.target.className;
	if (firstSquare) {
		if (event.target.className === color1) {
			console.log('match');
			numMatches++;
			scoreEl.innerText = numMatches;
			firstSquare = null;
			color1 = '';
			console.log('num matches', numMatches, 'num Pairs', numPairs);
			if (numMatches === numPairs) {
				console.log('Game Over');
				gameOver = true;
				console.log('Score', numMatches, 'High Score', highScore);
				if (numMatches > highScore) {
					localStorage.setItem('highScore', numMatches);
				}
			}
		} else {
			secondSquare = event.target;
			// Pause for one second and reset squares and event
			setTimeout(function() {
				firstSquare.style.backgroundColor = 'white';
				firstSquare.addEventListener('click', handleCardClick);
				event.target.style.backgroundColor = 'white';
				event.target.addEventListener('click', handleCardClick);
				color1 = '';
				firstSquare = null;
				secondSquare = null;
			}, 1000);
		}
	} else {
		firstSquare = event.target;
		color1 = event.target.className;
	}
}

function setupGame() {
	console.log('Start Game');
	start.innerText = 'Reset Game';
	gameOver = false;
	const numPairsEl = document.querySelector('#numPairs');
	numPairs = parseInt(numPairsEl.value);
	chosenColors = COLORPAIR.slice(0, numPairs);
	const COLORS = chosenColors.concat(chosenColors);
	let shuffledColors = shuffle(COLORS);
	createDivsForColors(shuffledColors);
}

// when the DOM loads
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded');
	start = document.querySelector('#start-reset');
	start.addEventListener('click', function() {
		if (gameOver) {
			if (gameContainer.firstElementChild) {
				location.reload();
			} else {
				setupGame();
			}
		} else {
			location.reload();
		}
	});
});
