import TestCase from './TestCase.js';
import Password from '../js/Password.js';
class TestPassword extends TestCase {
    testGen() {
        const test_cases = this.genTestCases();
        test_cases.forEach(c => {
            let result = c.password.gen();
            this.assertEquals(c.expected.min, result.length);
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
export default TestPassword;
