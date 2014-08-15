var FunctionMeta = require('../meta/function.js')
var verify = require('../verify-esprima-ast.js')

module.exports = functionDeclaration

/*  must verify this function is type sound.

    easy mode: find the identifier of this function in the
        identifiers table that has been populated by the
        jsigAst then verify that type is met

    hard mode: use type inference to generate a jsig AST for
        this function declaration. Then store that jsig AST
        in the identifiers table

    The way we check this thing is good recursively is creating
        a new meta object with a identifiers object with the
        types of the function parameters pre-populated and 
        a __proto__ that is the module-level identifiers.

    i.e. we should call verify on the body of the function
        with a meta object that prototypically inherits from
        the outer meta object

*/
function functionDeclaration(node, meta, callback) {
    var identifier = meta.identifiers[node.id.name]

    // if not identifier then hard mode
    if (!identifier) {
        return typeInferFunctionDeclaration(node, meta, callback)
    }

    var type = identifier.jsig

    var fMeta = FunctionMeta(meta)

    node.params.forEach(function (param, index) {
        if (param.type !== 'Identifier') {
            console.warn('unknown param node', param.type)
            return
        }

        var name = param.name
        var paramType = type.args[index]

        fMeta.identifiers[name] = {
            type: 'variable',
            jsig: paramType
        }
    })

    fMeta.returnValueType = type.result

    verify(node.body, fMeta, callback)
}

function typeInferFunctionDeclaration(node, meta, callback) {
    console.warn('skipping all type inference',
        node.id.name)

    callback(null)
}
