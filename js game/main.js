const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-kick2');
const $logo = document.querySelector('.logo');

function random(num) {
    return Math.ceil(Math.random() * num);
}

function renderHP(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
    person.elProgressbar.style.width = person.damageHP + '%';

    person.elProgressbar.classList.remove('low', 'critical');
    if (person.damageHP < 20) {
        person.elProgressbar.classList.add('critical');
    } else if (person.damageHP < 60) {
        person.elProgressbar.classList.add('low');
    }
}

function changeHP(count, person) {
    person.damageHP -= count;

    if (person.damageHP <= 0) {
        person.damageHP = 0;
    }
    renderHP(person);
}

function fight(maxDamage) {
    changeHP(random(maxDamage), character);
    changeHP(random(maxDamage), enemy);

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
    renderHP(character);
    renderHP(enemy);
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

renderHP(character);
renderHP(enemy);
