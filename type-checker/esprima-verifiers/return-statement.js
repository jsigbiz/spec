var verify = require('../verify-esprima-ast.js')
var checkSubType = require('../check-sub-type.js')

module.exports = returnStatement

function returnStatement(node, meta, callback) {
    var arg = node.argument

    verify(arg, meta, function (err, jsigType) {
        if (err) {
            return callback(err)
        }

        if (!jsigType) {
            console.log('expected jsigType from return',
                'statement', node.argument.type)
            return callback(null)
        }

        var error = checkSubType(meta.returnValueType, jsigType)
        if (error) {
            return callback(error)
        }

        callback(null, jsigType)
    })
}
