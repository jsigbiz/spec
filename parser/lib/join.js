var Parsimmon = require('parsimmon');

module.exports = join

function join(expr, seperator) {
    return expr.chain(function (value) {
        return seperator
            .then(expr)
            .many().map(function (values) {
                return [value].concat(values);
            });
    }).or(Parsimmon.succeed([]));
}
