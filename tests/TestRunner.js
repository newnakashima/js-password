class TestRunner {
    run(tests) {
        this.failed = false;
        tests.forEach(t => {
            let methods = Object.getOwnPropertyNames(t.prototype);
            let test_methods = methods.filter(method => {
                return /^test.*/.test(method);
            });
            var test = new t();
            test.beforeClass(t.name);
            test_methods.forEach(test_method => {
                test.setUp();
                test.runTest(test_method);
                test.tearDown();
            });
            this.failed = this.failed || test.failed;
            test.afterClass(t.name);
        });
        if (this.failed) {
            process.exit(1);
        }
    }
}
module.exports = TestRunner;

