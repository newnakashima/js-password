class TestCase {
    assertEquals(expected, actual) {
        if (expected === actual) {
            console.log("Test OK");
        } else {
            console.error(`Test Failed. Expected ${expected}, but actual is ${actual}.`);
        }
    }
}
export default TestCase;
