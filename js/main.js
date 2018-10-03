'use strict';

var Password = require('./Password.js');

let p = new Password();

const generate_button = document.getElementById('generate-button');
generate_button.addEventListener('click', () => {
    const new_password = document.createElement('li');
    let result = p.gen();
    if (result.success) {
        new_password.className = "password";
        new_password.addEventListener('click', password_click);
        new_password.innerHTML = p.escapeStr(result.text);
    } else {
        new_password.innerHTML = `<span style="color:red">${p.escapeStr(result.text)}</span>`;
    }
    document.querySelector('#generated-list').appendChild(new_password);
});

function password_click(e) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(e.target);
    selection.removeAllRanges();
    selection.addRange(range);
    const result = document.execCommand('copy');
    let text = '';
    if (result) {
        text = 'クリップボードにコピーしました。';
    } else {
        text = 'コピーに失敗しました。';
    }
    let toast = document.getElementById('toast');
    toast.innerText = text;
    show_toast(toast);
    selection.removeAllRanges();
}

var showing_toast = false;
function show_toast(elm) {
    if (showing_toast) {
        return;
    }
    showing_toast = true;
    elm.classList.remove('fadeout');
    elm.classList.add('fadein');
    elm.style.opacity = '1.0';
    setTimeout(() => hide_toast(elm), 2000);
}

function hide_toast(elm) {
    elm.classList.remove('fadein');
    elm.classList.add('fadeout');
    elm.style.opacity = '0.0';
    showing_toast = false;
}

const erase_button = document.getElementById('erase-button');
erase_button.addEventListener('click', () => {
    document.querySelector('#generated-list').innerHTML = '';
});

["min", "max", "cap", "sign", "num"].forEach(e => {
    const length = document.getElementById(e + '-length');
    length.addEventListener('change', elm => {
        p[e] = +elm.target.value;
    });
});

