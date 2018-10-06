'use strict';

var Password = require('./Password.js');

let p = new Password();
let form_valid = true;

const generate_button = document.getElementById('generate-button');
generate_button.addEventListener('click', () => {
    if (!form_valid) return;
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
    show_toast(text);
    selection.removeAllRanges();
}

var showing_toast = false;
function show_toast(text) {
    let toast = document.getElementById('toast');
    toast.innerText = text;
    if (showing_toast) {
        return;
    }
    showing_toast = true;
    toast.classList.remove('fadeout');
    toast.classList.add('fadein');
    toast.style.opacity = '1.0';
    setTimeout(() => hide_toast(), 2000);
}

function hide_toast() {
    let toast = document.getElementById('toast');
    toast.classList.remove('fadein');
    toast.classList.add('fadeout');
    toast.style.opacity = '0.0';
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

const allowed_signs = document.getElementById('allowed-signs');
allowed_signs.addEventListener('keyup', e => {
    if (e.target.value.length === 0 || validate_signs(e.target.value)) {
        p.setAllowedSigns(e.target.value);
        form_valid = true;
        allowed_signs_error(false);
    } else {
        show_toast('記号だけを入力して下さい');
        form_valid = false;
        allowed_signs_error(true);
    }
});

function validate_signs(value) {
    return value.match(/[^!"#$%&'()*+,\-./:;<=>?@\[\\\]\^_`\{\|\}~]/) === null;
}

function allowed_signs_error(error) {
    let allowed_signs_input = document.getElementById('allowed-signs');
    let allowed_signs_label = document.querySelector('label[for="allowed-signs"]');
    if (error) {
        allowed_signs_input.classList.add('error');
        allowed_signs_label.classList.add('error-label')
    } else {
        allowed_signs_input.classList.remove('error');
        allowed_signs_label.classList.remove('error-label');
    }
}
