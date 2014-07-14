'use strict';

var Parsimmon = require('parsimmon');

module.exports = join;

function join(expr, seperator, count) {
    count = count || 0;

    var defaultToken = count > 0 ?
        Parsimmon.fail('not found') :
        Parsimmon.succeed([]);

    return expr.chain(function (value) {
        return seperator
            .then(expr)
            .atLeast(count - 1).map(function (values) {
                return [value].concat(values);
            });
    }).or(defaultToken);
}
