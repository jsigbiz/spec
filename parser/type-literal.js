var Parsimmon = require('parsimmon');

var builtinTypes = [
    'String', 'Number', 'Object', 'void', 'Any', 'Array'
];

var builtinType = Parsimmon.alt.apply(null,
    builtinTypes.map(function (str) {
        return Parsimmon.string(str)
    })
).map(function (type) {
    return { 
        type: 'typeLiteral',
        builtin: true,
        name: type
    };
})

var customType = Parsimmon.regex(/[a-z]+/i)
    .map(function (type) {
        return {
            type: 'typeLiteral',
            builtin: false,
            name: type
        };
    })

var typeLiteral = Parsimmon.alt(
    builtinType,
    customType
)

module.exports = typeLiteral
