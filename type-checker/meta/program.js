var JsigAST = require('../../ast.js')

var requireType = JsigAST.functionType({
    args: [JsigAST.literal('String')],
    result: JsigAST.literal('Any')
})
requireType.isNodeRequireToken = true

var moduleType = JsigAST.object({
    exports: JsigAST.literal('Any')
})
moduleType.isNodeModuleToken = true

module.exports = ProgramMeta

/*  ProgramMeta is threaded through every verifier which
    verifies that an AST node is type sound.

    This is a place to put meta data about the state of the
    program so that each node in the AST can access it.

    currently it is

    {
        ast: EsprimaASTNodeForFile,
        filename: filenameOfAst,
        identifiers: Object<String, {
            type: 'variable' | 'function',
            jsig: JsigASTNode
        }>,
        moduleExportsNode: EsprimaASTNode,
        jsigUri: stringUriToJsigFile,
        jsigAst: jsigAstForFile,
        type: 'program'
    }

    We prepopulate meta with known identifiers and their types
*/
function ProgramMeta(ast, filename) {
    if (!(this instanceof ProgramMeta)) {
        return new ProgramMeta(ast, filename)
    }

    this.ast = ast
    this.filename = filename
    this.identifiers = {}
    this.moduleExportsNode = null
    this.jsigUri = null
    this.jsigAst = null
    this.type = 'program'

    this.identifiers.require = {
        type: 'variable',
        jsig: requireType
    }
    this.identifiers.module = {
        type: 'variable',
        jsig: moduleType
    }
}
