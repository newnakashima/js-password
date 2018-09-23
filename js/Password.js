'use strict';

let n = require('./util/nuckle');

const CODE = {
    ALPHA: {start: 97, end: 122},
    CAP:   {start: 65, end:  90},
    NUM:   {start: 48, end:  57}
}

class Password {
    constructor(min = 12, max = 16, cap = 1, sign = 1, num = 1) {
        this.min  = min;
        this.max  = max;
        this.cap  = cap;
        this.sign = sign;
        this.num  = num;

        this.length = min;
    }

    gen() {
        if (this.min > this.max) {
            this.max = this.min;
        }
        if (this.min == this.max) {
            this.length = this.min;
        } else {
            this.length = Math.floor(Math.random() * (this.max + 1 - this.min)) + this.min;
        } 
        const alpha_length = this.length - (this.cap + this.sign + this.num);
        try {
            const alpha_letters = this.createLetters(alpha_length, () => this.alphaChar());
            const cap_letters   = this.createLetters(this.cap,     () => this.capChar());
            const sign_letters  = this.createLetters(this.sign,    () => this.signChar());
            const num_letters   = this.createLetters(this.num,     () => this.numChar());
            const cat = alpha_letters.concat(cap_letters, sign_letters, num_letters);
            const shuffled = n.array_shuffle(cat);
            return {
                length:  this.length,
                text:    shuffled.join(''),
                success: true
            };
        } catch (e) {
            console.error(e);
            return {
                length:  -1,
                text:    'パスワードの生成に失敗しました。最小文字数か最大文字数が小さすぎる可能性があります。',
                success: false
            };
        }
    }

    createLetters(length, func) {
        return n.range(length).map(() => func());
    }

    randomIndex(type) {
        return Math.floor(Math.random() * (type.end + 1 - type.start)) + type.start;
    }

    alphaChar() {
        return String.fromCharCode(this.randomIndex(CODE.ALPHA));
    }

    capChar() {
        return String.fromCharCode(this.randomIndex(CODE.CAP));
    }

    signChar() {
        const parts = [
            {start: 33,  end:   47 },
            {start: 58,  end:   64 },
            {start: 91,  end:   96 },
            {start: 123, end:   126}
        ];
        let signs = [];
        parts.forEach(e => {
            for(let i = e.start; i <= e.end; i++) {
                signs.push(String.fromCharCode(i));
            }
        });
        let picked = signs[this.randomIndex({start: 0, end: signs.length - 1})];
        return picked;
    }

    escapeStr(input_str) {
        const escape_list = {
            "<": "&lt;",
            ">": "&gt;"
        };
        const escaped_str = input_str.split('').map(c => {
            if (c in escape_list) {
                return escape_list[c];
            }
            return c;
        });
        return escaped_str.join('');
    }

    numChar() {
        return String.fromCharCode(this.randomIndex(CODE.NUM));
    }
}
module.exports = Password;
