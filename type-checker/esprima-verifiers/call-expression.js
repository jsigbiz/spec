var path = require('path')

var typeCheck = require('../../type-checker/')
var validType = require('../valid-type.js')

module.exports = callExpression

/*  must verify call expression.

    Fetch the type of the identifier that is being called.

    verify that all arguments are valid types

    return the type of the result of the function to the
        callback
*/
function callExpression(node, meta, callback) {
    var callee = node.callee.name

    if (!meta.identifiers[callee]) {
        console.warn('skipping call expression', callee)
        return callback(null)
    }

    var type = meta.identifiers[callee].jsig

    var errors = node.arguments.map(function (arg, index) {
        return validType(arg, type.args[index], meta)
    }).filter(Boolean)

    if (errors.length) {
        return callback(errors[0])
    }

    if (!type.isNodeRequireToken) {
        callback(null, type.result)
    }

    // special case for require. The require function has a
    // return value of Any but we can find the real type by 
    // loading the source and analyzing it either by loading the
    // correct jsig definition file or by doing type inference
    getASTForRequire(node, meta, callback)
}

function getASTForRequire(node, meta, callback) {
    var arg = node.arguments[0].value

    var dirname = path.dirname(meta.filename)
    var uri
    //TODO handle non local uris
    //TODO replace resolve logic with node-resolve module
    if (arg[0] === '.') {
        uri = path.resolve(dirname, arg)
    }

    if (!uri) {
        console.warn('skipping require analysis for', arg)
        return callback(null)
    }

    // handle folders. lengthen to index.js
    if (uri.substr(-3) !== '.js') {
        uri = path.join(uri, 'index.js')
    }

    typeCheck(uri, function (err, meta) {
        if (err) {
            return callback(err)
        }

        // console.log('requireMeta', meta)
        callback(null)
    })
}
