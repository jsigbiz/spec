var program = require('./parser/program.js');

function parse(content) {
    return program.parse(content);
}

module.exports = parse;
