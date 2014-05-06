var Parsimmon = require('parsimmon')

var AST = require('../ast.js')

var stringLiteral = valueLiteral('string', Parsimmon.string('"')
    .then(Parsimmon.regex(/[#\-a-z]+/i))
    .skip(Parsimmon.string('"'))
    .map(function (str) {
        return '"' + str + '"'
    }))


var numberLiteral = valueLiteral('number', 
    Parsimmon.regex(/[0-9]+/i))

var nullLiteral = valueLiteral('null', Parsimmon.string('null'))

var undefinedLiteral = valueLiteral('undefined', 
    Parsimmon.string('undefined'))

var valueLiteral = Parsimmon.alt(
    stringLiteral,
    numberLiteral,
    nullLiteral,
    undefinedLiteral
)

module.exports = valueLiteral

function valueLiteral(name, parser) {
    return parser.map(function (value) {
        return AST.value(value, name)
    })
}
