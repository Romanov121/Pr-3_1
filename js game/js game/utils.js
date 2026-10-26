export default function random(num) {
    return Math.ceil(Math.random() * num);
}

export function getElById(id) {
    return document.getElementById(id);
}

export function countBtn(count = 6, el, text) {
    el.innerText = `${text} (${count})`;

    return function () {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${text} (${count})`;
        return count;
    };
}
