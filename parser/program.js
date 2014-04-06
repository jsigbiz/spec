var Parsimmon = require('parsimmon');

var statement = require('./statement.js');

var line = Parsimmon.optWhitespace
    .then(statement)
    .skip(Parsimmon.optWhitespace);

var program = line.many().map(function (statements) {
    return {
        type: 'program',
        statements: statements
    };
});

module.exports = program;
