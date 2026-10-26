import random, {getElById} from './utils.js';

const $logs = getElById('logs');

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

export function generateLog(firstPerson, secondPerson, count) {
    const {name: firstName, hp: {current, total}} = firstPerson;
    const {name: secondName} = secondPerson;
    const text = logs[random(logs.length) - 1](firstName, secondName);

    return `${text} -${count}, [${current}/${total}]`;
}

export function addLog(text) {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}

export function clearLogs() {
    $logs.innerHTML = '';
}
