var AST = require('../../ast.js')

module.exports = AST.functionType({
    args: [
        AST.literal('String'),
        AST.literal('String')
    ],
    result: AST.literal('String')
})
