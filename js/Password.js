import n from './util/nuckle';

const CODE = {
    ALPHA: {start: 97, end: 122},
    CAP:   {start: 65, end:  92},
    NUM:   {start: 48, end:  57}
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
            const cat = alpha_letters.concat(cap_letters, sign_letters, num_letters);
            const shuffled = n.array_shuffle(cat);
            return {
                length:  this.length,
                text:    shuffled.join(''),
                success: true
            };
        } catch (e) {
            console.error('failed');
            // return "gen failed";
            return {
                length:  -1,
                text:    '<span style="color:red">パスワードの生成に失敗しました。最小文字数か最大文字数が小さすぎる可能性があります。</span>',
                success: false
            };
        }
    }

    create_letters(length, func) {
        return n.range(length).map(() => func());
    }

    random_index(type) {
        return Math.floor(Math.random() * (type.end + 1 - type.start)) + type.start;
    }

    alpha_char() {
        return String.fromCharCode(this.random_index(CODE.ALPHA));
    }

    cap_char() {
        return String.fromCharCode(this.random_index(CODE.CAP));
    }

    sign_char() {
        const parts = [
            {start: 33,  end:   47 },
            {start: 58,  end:   64 },
            {start: 91,  end:   96 },
            {start: 123, end:   126}
        ];
        let signs = ["<"];
        parts.forEach(e => {
            for(let i = e.start; i <= e.end; i++) {
                // signs.push(String.fromCharCode(i));
            }
        });
        let picked = signs[this.random_index({start: 0, end: signs.length - 1})];
        return this.escape_char(picked);
    }

    escape_char(input_char) {
        const escape_list = {
            "<": "&lt;",
            ">": "&gt;"
        };
        if (input_char in escape_list) {
            return escape_list[input_char];
        }
        return input_char;
    }

    num_char() {
        return String.fromCharCode(this.random_index(CODE.NUM));
    }
}
export default Password;
