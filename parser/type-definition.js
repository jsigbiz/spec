var Parsimmon = require('parsimmon');

var join = require('./lib/join.js')

var typeDefinition = Parsimmon.lazy(function () {
    return Parsimmon.alt(
        typeLiteral,
        typeFunction,
        typeObject
    );
});

var unionType = join(typeDefinition,
    Parsimmon.optWhitespace
        .then(Parsimmon.string('|'))
        .skip(Parsimmon.optWhitespace)
).map(function (unions) {
    if (unions.length === 0) {
        return null
    }

    if (unions.length === 1) {
        return unions[0]
    }

    return {
        type: 'unionType',
        unions: unions
    }
})

module.exports = unionType;

var typeLiteral = require('./type-literal.js');
var typeFunction = require('./type-function.js');
var typeObject = require('./type-object.js');
