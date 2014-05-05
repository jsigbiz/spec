var Parsimmon = require('parsimmon');
var program = require('./parser/program.js');

function parse(content) {
    var res =  program.parse(content);

    if (res.status) {
        return res.value
    }

    var message = Parsimmon.formatError(content, res)
    throw new Error(message)
}

module.exports = parse;
