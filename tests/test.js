let TestRunner = require('./TestRunner.js');
let tests = [
    require('./PasswordTest.js')
];
let runner = new TestRunner();
runner.run(tests);
