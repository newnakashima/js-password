let TestCase = require('./TestCase.js');
let Password = require('../js/Password.js');
class PasswordTest extends TestCase {
    testGen() {
        const test_cases = this.genTestCases();
        test_cases.forEach(c => {
            let result = c.password.gen();
            let length_in_range = result.length >= c.expected.min && result.length <= c.expected.max;
            this.assertEquals(length_in_range, true);
            let regs = [
                {type: 'cap',  reg: /[A-Z]/g},
                {type: 'sign', reg: /[^a-zA-Z0-9]/g},
                {type: 'num',  reg: /[0-9]/g},
            ];
            regs.forEach(r => {
                let length = 0;
                if (r.reg.test(result.text)) {
                    length = result.text.match(r.reg).length;
                }
                this.assertEquals(c.expected[r.type], length);
            });
        });
    }

    genTestCases() {
        return [
            {
                password: new Password(8, 8, 0, 0, 0),
                expected: {
                    min:  8,
                    max:  8,
                    cap:  0,
                    sign: 0,
                    num:  0
                }
            },
            {
                password: new Password(12, 16, 1, 1, 1),
                expected: {
                    min:  12,
                    max:  16,
                    cap:  1,
                    sign: 1,
                    num:  1,
                }
            },
            {
                password: new Password(16, 12, 1, 1, 1),
                expected: {
                    min:  16,
                    max:  16,
                    cap:  1,
                    sign: 1,
                    num:  1,
                }
            },
            {
                password: new Password(16, 12, 0, 0, 1),
                expected: {
                    min:  16,
                    max:  16,
                    cap:  0,
                    sign: 0,
                    num:  1,
                }
            
            }
        ];
    }

    testCreateLetters() {
        const p = new Password(12, 16, 1, 1, 1);
        const ret = p.createLetters(3, () => 100);
        const expected = [100, 100, 100];
        expected.forEach((e, i) => this.assertEquals(e, ret[i]));
    }

    testRandomIndex() {
        const p = new Password(12, 16, 1, 1, 1);
        let a = 0;
        let b = 0;
        let c = 0;
        for (let i = 0; i < 3000; i++) {
            const result = p.randomIndex({start: 1, end: 3});
            switch (result) {
                case 1:
                    a++;
                    break;
                case 2:
                    b++;
                    break;
                case 3:
                    c++;
                    break;
                default:
                    break;
            }
        }
        [a, b, c].forEach(e => {
            this.assertEquals(e < 1200 && e > 800, true);
        });
    }

    testAlphaChar() {
        const p = new Password(12, 16, 1, 1, 1);
        let result = "";
        for (var i = 0; i < 1000; i++) {
            result += p.alphaChar();
        }
        this.assertEquals(/[^a-z]/.test(result), false);
        this.assertEquals(/[a-z]/.test(result), true);
    }

    testCapChar() {
        const p = new Password(12, 16, 1, 1, 1);
        let result = "";
        for (var i = 0; i < 1000; i++) {
            result += p.capChar();
        }
        this.assertEquals(/[^A-Z]/.test(result), false);
        this.assertEquals(/[A-Z]/.test(result), true);
    
    }

    testSignChar() {
        const p = new Password(12, 16, 1, 1, 1);
        let result = '';
        for (var i = 0; i < 1000; i++) {
            result += p.signChar();
        }
        this.assertEquals(/[a-z]/.test(result), false);
        this.assertEquals(/[A-Z]/.test(result), false);
        this.assertEquals(/[0-9]/.test(result), false);
        this.assertEquals(/[^a-zA-Z0-9]/.test(result), true);
    }

    testNumChar() {
        const p = new Password(12, 16, 1, 1, 1);
        let result = "";
        for (var i = 0; i < 1000; i++) {
            result += p.numChar();
        }
        this.assertEquals(/[^0-9]/.test(result), false);
        this.assertEquals(/[0-9]/.test(result), true);
    
    }

    testSetAllowedSigns() {
        let p = new Password(8,8,0,1,0);
        p.setAllowedSigns('=');
        const expected = '=';
        this.assertEquals(expected, p.signChar());
    }
}
module.exports = PasswordTest;

