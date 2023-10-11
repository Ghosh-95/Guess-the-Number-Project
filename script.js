'use strict';

const checkBtn = document.querySelector('.check');
const resetBtn = document.querySelector('.again');
const guessInput = document.querySelector('.guess');
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const displayScore = document.querySelector('.score');
const displayHighscore = document.querySelector('.highscore');
const h1 = document.querySelector('h1');

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

const displayMessage = msg => message.textContent = msg;

function styleHeading(text, color = 'white') {
    h1.textContent = text;
    h1.style.color = color;
}

function styleNumber(width, text = secretNumber) {

    number.style.width = width;
    number.textContent = text;
}

function displayResult(msg) {


    if (score > 1) {
        displayMessage(msg);
        score--;
        displayScore.textContent = score;
    } else {
        displayMessage('You lost the game 💥');
        styleHeading('Game Over!', 'red');
    }
}


const changeBackground = color => document.body.style.background = color;

function handler() {
    const guess = +guessInput.value;

    if (!guess) displayMessage('No number ⛔');
    else if (secretNumber === guess) {
        changeBackground('#60b347');
        styleHeading('You guessed it!!');
        styleNumber('30rem')
        displayMessage('Correct Number 🎉');
        displayHighscore.textContent = score;
        guessInput.setAttribute('disabled', 'true');

    } else if (guess < 1 || guess > 20) {
        displayMessage('Please enter between 1 and 20')
    } else {
        if (guess > secretNumber) {
            displayResult('Too high 💹');

        } else if (guess < secretNumber) {
            displayResult('Too low 📉');
        }
    }

}

function resetHandler() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    styleNumber('15rem', '?');
    styleHeading('Guess my number!');
    changeBackground('#222');
    displayMessage('Start Guessing...');
    guessInput.value = '';
    score = 20;
    displayScore.textContent = score;
    guessInput.removeAttribute('disabled', 'true');
}

checkBtn.addEventListener('click', handler);
guessInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handler();
});

resetBtn.addEventListener('click', resetHandler);
window.addEventListener('keydown', function (e) {
    if (e.key === 'r') resetHandler();
})