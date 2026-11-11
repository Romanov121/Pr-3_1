import Game from './game.js';

const game = new Game();
const $logo = document.querySelector('.logo');

$logo.addEventListener('click', game.startGame);

game.startGame();
