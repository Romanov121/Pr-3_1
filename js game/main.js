function renderHP() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    this.elProgressbar.style.width = this.damageHP + '%';

    this.elProgressbar.classList.remove('low', 'critical');
    if (this.damageHP < 20) {
        this.elProgressbar.classList.add('critical');
    } else if (this.damageHP < 60) {
        this.elProgressbar.classList.add('low');
    }
}

function changeHP(count) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
        this.damageHP = 0;
    }
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

const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-kick2');
const $logo = document.querySelector('.logo');

function random(num) {
    return Math.ceil(Math.random() * num);
}

function fight(maxDamage) {
    character.changeHP(random(maxDamage));
    enemy.changeHP(random(maxDamage));

    checkWinner();
}

function checkWinner() {
    if (character.damageHP === 0 && enemy.damageHP === 0) {
        endGame('Нічия!');
    } else if (character.damageHP === 0) {
        endGame('Бідолашний ' + character.name + ' програв бій!');
    } else if (enemy.damageHP === 0) {
        endGame('Бідолашний ' + enemy.name + ' програв бій!');
    }
}

function endGame(text) {
    $btn.disabled = true;
    $btn2.disabled = true;
    alert(text);
}

function resetGame() {
    character.damageHP = character.defaultHP;
    enemy.damageHP = enemy.defaultHP;
    character.renderHP();
    enemy.renderHP();
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
