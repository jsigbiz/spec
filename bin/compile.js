var path = require('path')

var compileAndVerify = require('../compiler/')

module.exports = compile

function compile(opts, cb) {
    var file = opts._[0]

    if (!file) {
        cb(new Error('must pass file argument'))
    }

    compileAndVerify(path.resolve(file), cb)
}
