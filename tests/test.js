import TestPassword from './TestPassword.js';
let tests = [TestPassword];
tests.forEach(t => {
    let methods = Object.getOwnPropertyNames(t.prototype);
    let test_methods = methods.filter(method => {
        return /^test.*/.test(method);
    });
    var test = new t();
    test.before(t.name);
    test_methods.forEach(test_method => {
        test.setUp();
        test[test_method]()
        test.tearDown();
    });
    test.after(t.name);
});
