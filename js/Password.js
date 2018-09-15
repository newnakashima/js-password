import n from './util/nuckle';

const CODE = {
    ALPHA_START:     97,
    ALPHA_END:       122,
    CAP_ALPHA_START: 65,
    CAP_ALPHA_END:   90,
    NUM_START:       48,
    NUM_END:         57
}

class Password {
    constructor(min = 12, max = 16, cap = 1, sign = 1, num = 1) {
        this.min = min;
        this.max = max;
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
            const alpha_letters = this.create_letters(alpha_length, () => this.alpha_char());
            const cap_letters = this.create_letters(this.cap, () => this.cap_char());
            const sign_letters = this.create_letters(this.sign, () => this.sign_char());
            const num_letters = this.create_letters(this.num, () => this.num_char());
            const shuffled = n.array_shuffle(alpha_letters.concat(cap_letters, sign_letters, num_letters));
            return shuffled.join('');
        } catch (e) {
            console.error('failed');
            return "gen failed";
        }
    }

    create_letters(length, func) {
        return n.range(length).map(() => func());
    }

    random_index(start, end) {
        return Math.floor(Math.random() * (end + 1 - start)) + start;
    }

    alpha_char() {
        return String.fromCharCode(this.random_index(CODE.ALPHA_START, CODE.ALPHA_END));
    }

    cap_char() {
        return String.fromCharCode(this.random_index(CODE.CAP_ALPHA_START, CODE.CAP_ALPHA_END));
    }

    sign_char() {
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
        return signs[this.random_index(0, signs.length -1)];
    }

    num_char() {
        return String.fromCharCode(this.random_index(CODE.NUM_START, CODE.NUM_END));
    }
}
export default Password;
