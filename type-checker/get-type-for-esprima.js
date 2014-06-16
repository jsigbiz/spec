var AST = require('../ast.js')

module.exports = getType

// given some esprima node and a meta context returns jsig typ
function getType(node, meta) {
    var value
    var type

    if (node.type === 'Literal') {
        value = node.value
    }

    if (!value) {
        console.warn('cannot get type for node', node.type)
        return
    }

    if (typeof value === 'string') {
        type = AST.literal('String')
    }

    return type
}
