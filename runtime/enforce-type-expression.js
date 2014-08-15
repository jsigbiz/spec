var console = require('console')

var wrapFunction = require('./wrappers/function.js')
var wrapTypeLiteral = require('./wrappers/type-literal.js')

module.exports = enforceTypeExpression

function enforceTypeExpression(expr, value, name) {
    if (expr.type === 'function') {
        return wrapFunction(expr, value, name)
    } else if (expr.type === 'typeLiteral') {
        return wrapTypeLiteral(expr, value, name)
    } else {
        console.warn('skipping check', expr)
        return value
    }
}




