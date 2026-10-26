import {getElById} from './utils.js';

class Selectors {
    constructor(name) {
        this.elHP = getElById(`health-${name}`);
        this.elProgressbar = getElById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({name, hp, type, selectors}) {
        super(selectors);

        this.name = name;
        this.type = type;
        this.hp = {
            current: hp,
            total: hp,
        };

        this.renderHP();
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const {elHP, hp: {current, total}} = this;

        elHP.innerText = current + ' / ' + total;
    }

    renderProgressbarHP = () => {
        const {hp: {current, total}, elProgressbar} = this;
        const percent = current / total * 100;

        elProgressbar.style.width = percent + '%';
        elProgressbar.classList.remove('low', 'critical');
        if (percent < 20) {
            elProgressbar.classList.add('critical');
        } else if (percent < 60) {
            elProgressbar.classList.add('low');
        }
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
        }

        this.renderHP();
        cb && cb(count);
    }

    resetHP = () => {
        this.hp.current = this.hp.total;
        this.renderHP();
    }
}

export default Pokemon;
