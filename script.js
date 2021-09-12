const COLORS = [
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
const gameContainer = document.getElementById('game');
const start = document.querySelector('#start-reset');

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
shuffle = array => {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		//pick a random index
		let index = Math.floor(Math.random() * counter);
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
};

createDiv = color => {
	const newDiv = document.createElement('div');
	newDiv.setAttribute('data-color', color);
	newDiv.addEventListener('click', handleCardClick);
	gameContainer.append(newDiv);
};

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
createDivsForColors = colorArray => {
	for (let color of colorArray) {
		createDiv(color);
	}
};
resetSquares = event => {
	firstSquare.style.backgroundColor = 'white';
	firstSquare.addEventListener('click', handleCardClick);
	event.target.style.backgroundColor = 'white';
	event.target.addEventListener('click', handleCardClick);
	color1 = '';
	firstSquare = null;
	secondSquare = null;
};

handleCardClick = event => {
	// Prevent clicking beyond two chosen squares
	if (secondSquare) return;

	event.target.removeEventListener('click', handleCardClick);
	event.target.style.backgroundColor = event.target.getAttribute('data-color');
	if (firstSquare) {
		// Match found
		if (event.target.getAttribute('data-color') === color1) {
			numMatches++;
			scoreEl.innerText = numMatches;
			firstSquare = null;
			color1 = '';

			if (numMatches === numPairs) {
				console.log('Game Over');
				document.querySelector('#gameOver').innerText =
					'You won! Click reset to play a new game.';
				gameOver = true;

				if (numMatches > highScore) {
					localStorage.setItem('highScore', numMatches);
				}
			}
		} else {
			// Second square of unmatched pair clicked
			secondSquare = event.target;
			// Pause for one second and reset squares and event
			setTimeout(() => {
				resetSquares(event);
			}, 1000);
		}
	} else {
		// First Square of pair clicked
		firstSquare = event.target;
		color1 = event.target.getAttribute('data-color');
	}
};

setupGame = () => {
	console.log('Start Game');
	start.innerText = 'Reset Game';
	gameOver = false;

	// Determine how many color pairs and create deck
	const numPairsEl = document.querySelector('#numPairs');
	numPairs = parseInt(numPairsEl.value);
	const chosenColors = COLORS.slice(0, numPairs);
	const COLORPAIRS = chosenColors.concat(chosenColors);

	// Shuffle deck and display cards
	const shuffledColors = shuffle(COLORPAIRS);
	createDivsForColors(shuffledColors);
	document.querySelector('#gameSetup').style.display = 'none';
};

start.addEventListener('click', () => {
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
