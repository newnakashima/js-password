let TestRunner = require('./TestRunner.js');
let tests = [
    require('./unit/PasswordTest.js')
];
let runner = new TestRunner();
runner.run(tests);
