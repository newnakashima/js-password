class TestCase {
    beforeClass(class_name) {
        console.log(class_name + "\n");
        this.failed = false;
        this.assertCount = 0;
        this.failedCount = 0;
        this.message = "";
    }

    setUp() {
    
    }

    runTest(method) {
        this.method_name = method;
        this.beforeTest();
        this[method]();
        this.afterTest();
    }

    beforeTest() {

    }

    assertEquals(expected, actual) {
        this.assertCount++;
        if (expected === actual) {
            process.stdout.write('.');
            // if assert succeeded.
        } else {
            process.stdout.write('F');
            this.failed = true;
            this.failedCount++;
            this.message += `\n${this.method_name} Failed. Expected ${expected}, but actual is ${actual}.`;
        }
    }

    afterTest() {

    }

    tearDown() {
    
    }

    afterClass(class_name) {
        console.log(this.message);
        console.log(`${this.assertCount} asserts, ${this.failedCount} failed.`);
        console.log("\n" + class_name + " ended.");
    }
}
module.exports = TestCase;

