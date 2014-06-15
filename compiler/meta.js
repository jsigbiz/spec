var JsigAST = require('../ast.js')

var requireType = JsigAST.functionType({
    args: [JsigAST.literal('String')],
    result: JsigAST.literal('Any')
})

module.exports = Meta

/* Meta is threaded through every verifier which verifies that
    an AST node is type sound.

    This is a place to put meta data about the state of the
    program so that each node in the AST can access it.

    currently it is

    {
        ast: EntireASTNode,
        filename: filenameOfAst,
        identifiers: Object<String, {
            type: 'variable' | 'function',
            jsig: JsigASTNode
        }>
    }

    We prepopulate meta with known identifiers and their types
*/
function Meta(ast, filename) {
    if (!(this instanceof Meta)) {
        return new Meta(ast, filename)
    }

    this.ast = ast
    this.filename = filename
    this.identifiers = {}

    this.identifiers.require = {
        type: 'variable',
        jsig: requireType
    }
}
