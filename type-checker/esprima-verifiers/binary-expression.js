var operators = require('../operators/')
var checkSubType = require('../check-sub-type.js')

module.exports = binaryExpression

function binaryExpression(node, meta, callback) {
    var operatorType = operators[node.operator]
    if (!operatorType) {
        console.warn('skipping operator', node.operator)
        return callback(null)
    }

    console.log('binary', node)

    var args = [node.left, node.right]

    var errors = args.map(function (arg, index) {
        var name = arg.name
        var type = meta.identifiers[name] &&
            meta.identifiers[name].jsig

        if (!type) {
            return new Error('untyped identifier ' + name)
        }

        return checkSubType(operatorType.args[index], type)
    }).filter(Boolean)

    if (errors.length) {
        return callback(errors[0])
    }

    // must verify that invoking the operator of the expression
    // is sound. Similar to how we verify callExpression

    callback(null, operatorType.result)
}
