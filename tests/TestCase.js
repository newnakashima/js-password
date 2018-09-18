class TestCase {
    beforeClass(class_name) {
        console.log(class_name);
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
        this.assertCount = 0;
        this.failedCount = 0;
        this.message = "";
    }

    assertEquals(expected, actual) {
        this.assertCount++;
        this.failed = false;
        if (expected === actual) {
            // if assert succeeded.
        } else {
            this.failed = true;
            this.failedCount++;
            this.message += `\n${this.method_name} Failed. Expected ${expected}, but actual is ${actual}.`;
        }
    }

    afterTest() {
        if (this.failed) {
            process.stdout.write('F');
        } else {
            process.stdout.write('.');
        }
        console.log(this.message);
        console.log(`${this.assertCount} asserts, ${this.failedCount} failed.`);
    }

    tearDown() {
    
    }

    afterClass(class_name) {
        console.log("\n" + class_name + " ended.");
    }
}
module.exports = TestCase;

