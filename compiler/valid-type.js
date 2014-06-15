var validators = {
    'typeLiteral': validTypeLiteral
}

/* validType takes an ast node and a jsigAst and it will return
    either an Error or null.

    If it returns an Error it means that the node's type does
    not match the jsigAst

*/
module.exports = validType

function validType(node, jsigAst, meta) {
    if (validators[jsigAst.type]) {
        return validators[jsigAst.type](node, jsigAst, meta)
    } else {
        console.warn('skipping type validation', jsigAst.type)
    }
}

function validTypeLiteral(node, jsigAst, meta) {
    if (!jsigAst.builtin) {
        console.warn('skipping non builtin typeLiteral',
            jsigAst.name)
        return
    }

    var name = jsigAst.name

    var value

    if (node.type === 'Literal') {
        value = node.value
    }

    if (!value) {
        console.warn('skipping node without value', node.type)
        return
    }

    if (name === 'String') {
        if (typeof value !== 'string') {
            return new Error('expected string')
        }
    } else {
        console.warn('skipping other builtins', name)
    }
}
