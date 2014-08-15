'use strict';

var Parsimmon = require('parsimmon');

var typeGeneric = require('./type-generic.js');
var valueLiteral = require('./value-literal.js');

var typeOrValueLiteral = Parsimmon.alt(
    valueLiteral,
    typeGeneric
);

module.exports = typeOrValueLiteral;
