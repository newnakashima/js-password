import TestPassword from './TestPassword.js';
let tests = [TestPassword];
tests.forEach(t => {
    let methods = Object.getOwnPropertyNames(t.prototype);
    let test_methods = methods.filter(method => {
        return /^test.*/.test(method);
    });
    var test = new t();
    test_methods.forEach(test_method => test[test_method]());
});
