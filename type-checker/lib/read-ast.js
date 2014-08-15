var fs = require('fs')
var esprima = require('esprima')

module.exports = readAST

function readAST(filename, callback) {
    fs.readFile(filename, 'utf8', function (err, content) {
        if (err) {
            return callback(err)
        }

        callback(null, esprima.parse(content))
    })
}
