'use strict';

var Parsimmon = require('parsimmon');

module.exports = {
    importWord: lexeme(Parsimmon.string('import')),
    openCurlyBrace: lexeme(Parsimmon.string('{')),
    closeCurlyBrace: lexeme(Parsimmon.string('}')),
    fromWord: lexeme(Parsimmon.string('from')),
    quote: lexeme(Parsimmon.string('"')),
    identifier: lexeme(Parsimmon.regex(/[a-z\-\/]+/i)),
    labelName: lexeme(Parsimmon.regex(/[a-z\?]+/i)),
    typeName: lexeme(Parsimmon.regex(/[a-z]+/i)),
    labelSeperator: lexeme(Parsimmon.string(':')),
    comma: lexeme(Parsimmon.string(',')),
    openAngularBrace: lexeme(Parsimmon.string('<')),
    closeAngularBrace: lexeme(Parsimmon.string('>')),
    typeWord: lexeme(Parsimmon.string('type')),
    unionSeperator: lexeme(Parsimmon.string('|')),
    intersectionSeperator: lexeme(Parsimmon.string('&')),
    openRoundBrace: lexeme(Parsimmon.string('(')),
    closeRoundBrace: lexeme(Parsimmon.string(')')),
    arrow: lexeme(Parsimmon.string('=>')),
    openSquareBrace: lexeme(Parsimmon.string('[')),
    closeSquareBrace: lexeme(Parsimmon.string(']')),
    notAQuote: lexeme(Parsimmon.regex(/[^\"]+/i)),
    number: lexeme(Parsimmon.regex(/[0-9]+/i)),
    nullWord: lexeme(Parsimmon.string('null')),
    undefinedWord: lexeme(Parsimmon.string('undefined'))
};

function lexeme(p) {
    return p.skip(Parsimmon.optWhitespace);
}
