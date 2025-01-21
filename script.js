const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
let flippedCards = [];
let matchedCards = [];
let attempts = 0;
const gameBoard = document.getElementById('game-board');
const attemptsDisplay = document.getElementById('attempts');
const resetButton = document.getElementById('reset-button');

// Shuffle the cards array
function shuffleCards() {
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
}

// Create and display the cards on the board
function createCards() {
    gameBoard.innerHTML = '';
    cardsArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);
        cardElement.dataset.cardValue = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Flip the card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.textContent = this.dataset.cardValue;
        this.classList.add('flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if the flipped cards match
function checkForMatch() {
    attempts++;
    attemptsDisplay.textContent = attempts;
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.cardValue === secondCard.dataset.cardValue) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
        // Check if the game is over
        if (matchedCards.length === cardsArray.length) {
            alert(`Congratulations! You've won the game in ${attempts} attempts!`);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = ' ';
            secondCard.textContent = ' ';
            flippedCards = [];
        }, 1000);
    }
}

// Reset the game
function resetGame() {
    cardsArray.forEach((card, index) => {
        const cardElement = document.querySelector(`[data-id="${index}"]`);
        cardElement.classList.remove('flipped', 'matched');
        cardElement.textContent = '';
    });
    flippedCards = [];
    matchedCards = [];
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    shuffleCards();
    createCards();
}

// Initialize the game
function initializeGame() {
    shuffleCards();
    createCards();
}

resetButton.addEventListener('click', resetGame);
initializeGame();
