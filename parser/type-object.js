var Parsimmon = require('parsimmon');

var join = require('./lib/join.js');

// { text: String }

var objectKey = Parsimmon.regex(/[a-z]+/i)
    .skip(Parsimmon.string(':'))
    .skip(Parsimmon.optWhitespace)

var typeKeyValue = Parsimmon.lazy(function () {
    return objectKey
        .chain(function (keyName) {
            return typeDefinition
                .map(function (keyValue) {
                    return {
                        type: 'keyValue',
                        key: keyName,
                        value: keyValue
                    }
                })
        })
})

var typeKeyValues = join(
    typeKeyValue,
    Parsimmon.optWhitespace
        .then(Parsimmon.string(','))
        .then(Parsimmon.optWhitespace)
);

var typeObject = Parsimmon.string('{')
    .skip(Parsimmon.optWhitespace)
    .then(typeKeyValues)
    .skip(Parsimmon.optWhitespace)
    .skip(Parsimmon.string('}'))
    .map(function (values) {
        return {
            type: 'object',
            keyValues: values
        }
    })

module.exports = typeObject;

var typeDefinition = require('./type-definition.js');
