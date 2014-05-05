var Parsimmon = require('parsimmon')

var AST = require('../ast.js')

var stringLiteral = valueLiteral('string', Parsimmon.string('"')
    .then(Parsimmon.regex(/[#\-a-z]+/i))
    .skip(Parsimmon.string('"')))

var numberLiteral = valueLiteral('number', 
    Parsimmon.regex(/[0-9]+/i))

var nullLiteral = valueLiteral('null', Parsimmon.string('null'))


var valueLiteral = Parsimmon.alt(
    stringLiteral,
    numberLiteral,
    nullLiteral
)

module.exports = valueLiteral

function valueLiteral(name, parser) {
    return parser.map(function (value) {
        return AST.value(value, name)
    })
}
