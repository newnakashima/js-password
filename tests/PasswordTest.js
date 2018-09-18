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
            }
        ];
    }
}
module.exports = PasswordTest;

