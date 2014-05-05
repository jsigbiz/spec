var Parsimmon = require('parsimmon');

module.exports = join

function join(expr, seperator, count) {
    return expr.chain(function (value) {
        return seperator
            .then(expr)
            .atLeast(count || 0).map(function (values) {
                return [value].concat(values);
            });
    }).or(Parsimmon.succeed([]));
}
