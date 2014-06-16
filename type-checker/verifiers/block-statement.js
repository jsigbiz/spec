var series = require('run-series')

var verify = require('../verify.js')

module.exports = blockStatement

function blockStatement(node, meta, callback) {
    var tasks = node.body.map(function (node) {
        return verify.bind(null, node, meta)
    })

    series(tasks, callback)
}
