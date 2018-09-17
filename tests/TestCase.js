class TestCase {
    before(class_name) {
        console.log(class_name + " test start.");
    }

    setUp() {
    
    }

    assertEquals(expected, actual) {
        if (expected === actual) {
            console.log(".");
        } else {
            console.error(`Test Failed. Expected ${expected}, but actual is ${actual}.`);
        }
    }

    tearDown() {
    
    }

    after(class_name) {
        console.log(class_name + " test ended.");
    }
}
export default TestCase;
