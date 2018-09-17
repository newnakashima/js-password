let fs = require('fs');
let acorn = require('acorn');
let escodegen = require('escodegen');

class TestCase {
    loadClass(path) {
        const data = fs.readFileSync(path, 'utf8');
        const ast = acorn.parse(data, {sourceType: 'module'});
        const new_ast = this.browser2node(ast);
        const new_code = escodegen.generate(new_ast);
        eval(new_code);
    }

    browser2node(ast) {
        let result = ast.body.map(exp => {
            if (exp.type === 'ImportDeclaration') {
                return this.import2require(exp);
            }
            return exp;
        });
        ast.body = result;
        return ast;
    }

    import2require(exp) {
        let var_name = exp.specifiers[0].local.name;
        let import_path = exp.source.value;
        let require_ast = acorn.parse(`var ${var_name} = require("${import_path}")`, {sourceType: 'module'});
        return require_ast;
    }

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
module.exports = TestCase;
