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

const renderHP = (pokemon) => {
    pokemon.elHP.innerText = pokemon.damageHP + ' / ' + pokemon.defaultHP;
    pokemon.elProgressbar.style.width = pokemon.damageHP + '%';

    pokemon.elProgressbar.classList.remove('low', 'critical');
    if (pokemon.damageHP < 20) {
        pokemon.elProgressbar.classList.add('critical');
    } else if (pokemon.damageHP < 60) {
        pokemon.elProgressbar.classList.add('low');
    }
};

const changeHP = (pokemon, count) => {
    pokemon.damageHP -= count;

    if (pokemon.damageHP <= 0) {
        pokemon.damageHP = 0;
    }

    const log = pokemon === enemy ? generateLog(pokemon, character, count) : generateLog(pokemon, enemy, count);
    addLog(log);

    renderHP(pokemon);
};

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

const [$btn, $btn2] = document.querySelectorAll('.button');
const MAX_CLICKS = 6;
const $logo = document.querySelector('.logo');
const $logs = document.getElementById('logs');

const random = (num) => {
    return Math.ceil(Math.random() * num);
};

const generateLog = (firstPerson, secondPerson, count) => {
    const text = logs[random(logs.length) - 1](firstPerson.name, secondPerson.name);

    return `${text} -${count}, [${firstPerson.damageHP}/${firstPerson.defaultHP}]`;
};

const addLog = (text) => {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
};

const createClickCounter = ($button, limit) => {
    const label = $button.innerText.trim();
    let count = 0;

    const render = () => {
        $button.innerText = `${label} (${limit - count})`;
        $button.disabled = count >= limit;
    };

    render();

    return {
        click: () => {
            if (count >= limit) {
                return false;
            }
            count++;
            console.log(`${label}: натискань ${count}, залишилось ${limit - count}`);
            render();
            return true;
        },
        left: () => limit - count,
        reset: () => {
            count = 0;
            render();
        },
    };
};

const counter1 = createClickCounter($btn, MAX_CLICKS);
const counter2 = createClickCounter($btn2, MAX_CLICKS);

const fight = (maxDamage) => {
    changeHP(character, random(maxDamage));
    changeHP(enemy, random(maxDamage));

    checkWinner();
};

const checkWinner = () => {
    const noClicksLeft = counter1.left() === 0 && counter2.left() === 0;

    if (character.damageHP === 0 && enemy.damageHP === 0) {
        endGame('Нічия!');
    } else if (character.damageHP === 0) {
        endGame(`Бідолашний ${character.name} програв бій!`);
    } else if (enemy.damageHP === 0) {
        endGame(`Бідолашний ${enemy.name} програв бій!`);
    } else if (noClicksLeft) {
        if (character.damageHP > enemy.damageHP) {
            endGame(`Кліки закінчились. Перемагає ${character.name}!`);
        } else if (character.damageHP < enemy.damageHP) {
            endGame(`Кліки закінчились. Перемагає ${enemy.name}!`);
        } else {
            endGame('Кліки закінчились. Нічия!');
        }
    }
};

const endGame = (text) => {
    $btn.disabled = true;
    $btn2.disabled = true;
    setTimeout(() => alert(text), 0);
};

const resetGame = () => {
    character.damageHP = character.defaultHP;
    enemy.damageHP = enemy.defaultHP;
    renderHP(character);
    renderHP(enemy);
    $logs.innerHTML = '';
    counter1.reset();
    counter2.reset();
};

[
    [$btn, counter1, 20],
    [$btn2, counter2, 40],
].forEach(([$button, counter, maxDamage]) => {
    $button.addEventListener('click', () => {
        if (counter.click()) {
            fight(maxDamage);
        }
    });
});

$logo.addEventListener('click', resetGame);

renderHP(character);
renderHP(enemy);
