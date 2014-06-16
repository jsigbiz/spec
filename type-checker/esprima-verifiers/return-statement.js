var verify = require('../verify-esprima-ast.js')
var isSubType = require('../is-sub-type.js')

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

        var bool = isSubType(meta.returnValueType, jsigType)
        if (!bool) {
            var error = new Error('expected return statement ' +
                'to be subtype of thing')
            return callback(error)
        }

        callback(null, jsigType)
    })
}
