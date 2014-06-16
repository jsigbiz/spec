var parallel = require('run-parallel')

var verify = require('../verify.js')

module.exports = variableDeclaration

function variableDeclaration(node, meta, callback) {
    var tasks = node.declarations.map(function (node) {
        return verify.bind(null, node, meta)
    })

    parallel(tasks, callback)
}
