const logs = [
    (firstName, secondName) => `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.`,
    (firstName, secondName) => `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага.`,
    (firstName, secondName) => `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    (firstName, secondName) => `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар.`,
    (firstName, secondName) => `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком <вырезанно цензурой> противника.`,
    (firstName, secondName) => `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар.`,
    (firstName, secondName) => `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар.`,
    (firstName, secondName) => `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника`,
    (firstName, secondName) => `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника.`,
    (firstName, secondName) => `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику.`
];

function renderHP() {
    const {elHP, elProgressbar, damageHP, defaultHP} = this;

    elHP.innerText = damageHP + ' / ' + defaultHP;
    elProgressbar.style.width = damageHP + '%';

    elProgressbar.classList.remove('low', 'critical');
    if (damageHP < 20) {
        elProgressbar.classList.add('critical');
    } else if (damageHP < 60) {
        elProgressbar.classList.add('low');
    }
}

function changeHP(count) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
        this.damageHP = 0;
    }

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    addLog(log);

    this.renderHP();
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP: renderHP,
    changeHP: changeHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP: renderHP,
    changeHP: changeHP,
};

const [$btn, $btn2] = document.querySelectorAll('.button');
const $logo = document.querySelector('.logo');
const $logs = document.getElementById('logs');

function random(num) {
    return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, count) {
    const {name: firstName, damageHP, defaultHP} = firstPerson;
    const {name: secondName} = secondPerson;
    const text = logs[random(logs.length) - 1](firstName, secondName);

    return `${text} -${count}, [${damageHP}/${defaultHP}]`;
}

function addLog(text) {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}

function fight(maxDamage) {
    character.changeHP(random(maxDamage));
    enemy.changeHP(random(maxDamage));

    checkWinner();
}

function checkWinner() {
    const {name: characterName, damageHP: characterHP} = character;
    const {name: enemyName, damageHP: enemyHP} = enemy;

    if (characterHP === 0 && enemyHP === 0) {
        endGame('Нічия!');
    } else if (characterHP === 0) {
        endGame(`Бідолашний ${characterName} програв бій!`);
    } else if (enemyHP === 0) {
        endGame(`Бідолашний ${enemyName} програв бій!`);
    }
}

function endGame(text) {
    $btn.disabled = true;
    $btn2.disabled = true;
    alert(text);
}

function resetGame() {
    const {defaultHP: characterDefaultHP} = character;
    const {defaultHP: enemyDefaultHP} = enemy;

    character.damageHP = characterDefaultHP;
    enemy.damageHP = enemyDefaultHP;
    character.renderHP();
    enemy.renderHP();
    $logs.innerHTML = '';
    $btn.disabled = false;
    $btn2.disabled = false;
}

$btn.addEventListener('click', function () {
    fight(20);
});

$btn2.addEventListener('click', function () {
    fight(40);
});

$logo.addEventListener('click', resetGame);

character.renderHP();
enemy.renderHP();
