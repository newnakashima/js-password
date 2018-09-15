import Password from './Password.js';

let p = new Password();

const generate_button = document.getElementById('generate-button');
generate_button.addEventListener('click', () => {
    const new_password = document.createElement('li');
    let text = p.gen();
    if (text == "gen failed") {
        text = '<span style="color:red">パスワードの生成に失敗しました。最小文字数か最大文字数が小さすぎる可能性があります。</span>';
    }
    new_password.innerHTML = text;
    document.querySelector('#generated-list').appendChild(new_password);
});

const erase_button = document.getElementById('erase-button');
erase_button.addEventListener('click', () => {
    document.querySelector('#generated-list').innerHTML = '';
});

const min_length = document.getElementById('min-length');
min_length.addEventListener('change', e => {
    console.log(e.target.value);
    p.min = +e.target.value;
});

const max_length = document.getElementById('max-length');
max_length.addEventListener('change', e => {
    console.log(e.target.value);
    p.max = +e.target.value;
});
