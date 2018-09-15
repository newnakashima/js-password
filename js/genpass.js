import n from './util/nuckle';

const CODE = {
    ALPHA_START: 97,
    ALPHA_END: 122,
    CAP_ALPHA_START: 65,
    CAP_ALPHA_END: 90
}

class Password {
    constructor(min = 12, max = 16, sign = 1, num = 1, cap = 1) {
        if (min > max) {
            throw new Error('min は max 以下でなくてはいけません！');
        }
        this.min  = min;
        this.max  = max;
        this.sign = sign;
        this.num  = num;
        this.cap  = cap;

        this.length = min;
    }

    gen() {
        if (this.min != this.max) {
            this.length = Math.floor(Math.random() * (this.max + 1 - this.min)) + this.min;
        } 
        const alpha_length = this.length - (this.sign + this.num + this.cap);
        const alpha_letters = this.create_alpha_letters(alpha_length);
        const cap_letters = this.create_cap_letters(this.cap);
        const shuffled = n.array_shuffle(alpha_letters.concat(cap_letters));
        return shuffled.join('');
    }

    create_alpha_letters(length) {
        return n.range(length).map(() => this.alpha_char());
    }

    create_cap_letters(length) {
        return n.range(length).map(() => this.cap_char());
    }

    random_char(start, end) {
        const code = Math.floor(Math.random() * (end + 1 - start)) + start;
        return String.fromCharCode(code);
    }

    alpha_char() {
        return this.random_char(CODE.ALPHA_START, CODE.ALPHA_END);
    }

    cap_char() {
        return this.random_char(CODE.CAP_ALPHA_START, CODE.CAP_ALPHA_END);
    }
}

let p = new Password();
document.querySelector('#gened-pass').innerText = p.gen();
