class Password(min = 12, max = 16, sign = 1, num = 1, cap = 1) {
    constructor() {
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
            this.length = Math.floor(Math.random() * (max + 1 - min)) + min;
        } 

        let s_leters = [];
    }
}
