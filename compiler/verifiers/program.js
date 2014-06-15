var parallel = require('run-parallel')

var verify = require('../verify.js')

module.exports = program

function program(node, meta, callback) {
    var tasks = node.body.map(function (node) {
        return verify.bind(null, node, meta)
    })

    parallel(tasks, callback)
}
