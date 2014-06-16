var verify = require('../verify.js')

module.exports = variableDeclarator

function variableDeclarator(node, meta, callback) {
    var id = node.id.name

    verify(node.init, meta, function (err, jsigAst) {
        if (err) {
            return callback(err)
        }

        if (!jsigAst) {
            console.warn('could not get type for', id)
        }

        meta.identifiers[id] = {
            type: 'variable',
            jsig: jsigAst
        }
        callback(null)
    })
}
