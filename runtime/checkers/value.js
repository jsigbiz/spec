module.exports = checkValue

var checkTypeLiteral = require('./type-literal.js')
var checkUnionType = require('./union-type.js')

function checkValue(expr, value, description) {
    if (expr.type === 'typeLiteral') {
        return checkTypeLiteral(expr, value, description)
    } else if (expr.type === 'unionType') {
        return checkUnionType(expr, value, description)
    } else {
        console.warn('checkValue: skipping check', expr, description)
    }
}
