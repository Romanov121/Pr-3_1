const random = (num) => Math.ceil(Math.random() * num);

export const randomRange = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

export const getRandomItem = (arr) => arr[random(arr.length) - 1];

export const getElById = (id) => document.getElementById(id);

export const countBtn = (limit = 6, el, text) => {
    let count = limit;
    let clicks = 0;

    const render = () => {
        el.innerText = `${text} (${count})`;
        el.disabled = count === 0;
    };

    render();

    return {
        click: () => {
            if (count === 0) {
                return false;
            }
            count--;
            clicks++;
            console.log(`${text}: натискань ${clicks}, залишилось ${count}`);
            render();
            return true;
        },
        left: () => count,
    };
};

export default random;
