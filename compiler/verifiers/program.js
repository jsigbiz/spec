var series = require('run-series')

var isModuleExports = require('../../lib/is-module-exports.js')
var verify = require('../verify.js')

module.exports = program

function program(node, meta, callback) {
    var body = hoistFunctionDeclaration(node.body)

    var moduleExports = body.filter(isModuleExports)[0]
    if (moduleExports) {
        var right = moduleExports.expression.right
        meta.moduleExportsNode = right
    }

    var tasks = body.map(function (node) {
        return verify.bind(null, node, meta)
    })

    series(tasks, callback)
}

// hoisting function declarations to the top makes the tree
// order algorithm simpler
function hoistFunctionDeclaration(nodes) {
    var declarations = nodes.filter(function (node) {
        return node.type === 'FunctionDeclaration'
    })
    var other = nodes.filter(function (node) {
        return node.type !== 'FunctionDeclaration'
    })

    return [].concat(declarations, other)
}
