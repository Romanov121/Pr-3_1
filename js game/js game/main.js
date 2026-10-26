import Pokemon from './pokemon.js';
import random, {countBtn} from './utils.js';
import {generateLog, addLog, clearLogs} from './logs.js';

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 100,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 100,
    selectors: 'enemy',
});

const [$btn, $btn2] = document.querySelectorAll('.button');
const $logo = document.querySelector('.logo');

const textBtn = $btn.innerText.trim();
const textBtn2 = $btn2.innerText.trim();

let btnCountJolt = countBtn(6, $btn, textBtn);
let btnCountPunch = countBtn(10, $btn2, textBtn2);

function fight(maxDamage) {
    player1.changeHP(random(maxDamage), function (count) {
        addLog(generateLog(player1, player2, count));
    });
    player2.changeHP(random(maxDamage), function (count) {
        addLog(generateLog(player2, player1, count));
    });

    checkWinner();
}

function checkWinner() {
    const {name: name1, hp: {current: hp1}} = player1;
    const {name: name2, hp: {current: hp2}} = player2;

    if (hp1 === 0 && hp2 === 0) {
        endGame('Нічия!');
    } else if (hp1 === 0) {
        endGame(`Бідолашний ${name1} програв бій!`);
    } else if (hp2 === 0) {
        endGame(`Бідолашний ${name2} програв бій!`);
    }
}

function endGame(text) {
    $btn.disabled = true;
    $btn2.disabled = true;
    alert(text);
}

function resetGame() {
    player1.resetHP();
    player2.resetHP();
    clearLogs();
    btnCountJolt = countBtn(6, $btn, textBtn);
    btnCountPunch = countBtn(10, $btn2, textBtn2);
    $btn.disabled = false;
    $btn2.disabled = false;
}

$btn.addEventListener('click', function () {
    btnCountJolt();
    fight(20);
});

$btn2.addEventListener('click', function () {
    btnCountPunch();
    fight(40);
});

$logo.addEventListener('click', resetGame);
