import Pokemon from './pokemon.js';
import {pokemons} from './pokemons.js';
import {countBtn, getRandomItem, randomRange} from './utils.js';
import {generateLog, addLog, clearLogs} from './logs.js';

class Game {
    constructor() {
        this.$control = document.querySelector('.control');
        this.player1 = null;
        this.player2 = null;
        this.counters = [];
        this.defeated = 0;
        this.isOver = false;
    }

    getRandomPokemon = (...excludeNames) => {
        const available = pokemons.filter((item) => !excludeNames.includes(item.name));

        return getRandomItem(available);
    }

    createPlayer = (pokemon, selectors) => new Pokemon({...pokemon, selectors});

    startGame = () => {
        const pokemon1 = this.getRandomPokemon();
        const pokemon2 = this.getRandomPokemon(pokemon1.name);

        this.player1 = this.createPlayer(pokemon1, 'player1');
        this.player2 = this.createPlayer(pokemon2, 'player2');
        this.defeated = 0;
        this.isOver = false;

        clearLogs();
        this.renderButtons();
    }

    clearButtons = () => {
        this.$control.querySelectorAll('.button').forEach(($item) => $item.remove());
    }

    renderButtons = () => {
        this.clearButtons();
        this.counters = [];

        this.player1.attacks.forEach((attack) => {
            const $btn = document.createElement('button');
            $btn.classList.add('button');

            const counter = countBtn(attack.maxCount, $btn, attack.name);
            this.counters.push(counter);

            $btn.addEventListener('click', () => this.attack(attack, counter));
            this.$control.appendChild($btn);
        });
    }

    hit = (attacker, target, attack) => {
        const damage = randomRange(attack.minDamage, attack.maxDamage);

        target.changeHP(damage, (count) => {
            addLog(generateLog(target, attacker, count, attack.name));
        });
    }

    attack = (attack, counter) => {
        if (this.isOver || !counter.click()) {
            return;
        }

        this.hit(this.player1, this.player2, attack);

        if (this.player2.hp.current === 0) {
            this.nextEnemy();
        } else {
            const [firstAttack] = this.player2.attacks;
            this.hit(this.player2, this.player1, firstAttack);
        }

        this.checkEnd();
    }

    nextEnemy = () => {
        const {name} = this.player2;

        this.defeated++;
        addLog(`${name} переможений! Переможено ворогів: ${this.defeated}`);
        this.player2 = this.createPlayer(
            this.getRandomPokemon(this.player1.name, name),
            'player2'
        );
    }

    checkEnd = () => {
        const noAttacksLeft = this.counters.every((counter) => counter.left() === 0);

        if (this.player1.hp.current === 0) {
            this.endGame(`Бідолашний ${this.player1.name} програв бій! Переможено ворогів: ${this.defeated}`);
        } else if (noAttacksLeft) {
            this.endGame(`Удари закінчились. Переможено ворогів: ${this.defeated}`);
        }
    }

    endGame = (text) => {
        this.isOver = true;
        this.clearButtons();

        const $start = document.createElement('button');
        $start.classList.add('button', 'start');
        $start.innerText = 'START GAME';
        $start.addEventListener('click', this.startGame);
        this.$control.appendChild($start);

        setTimeout(() => alert(text), 0);
    }
}

export default Game;
