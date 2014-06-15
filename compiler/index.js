var esprima = require('esprima')
var fs = require('fs')

var verify = require('./verify.js')
var Meta = require('./meta.js')

module.exports = compile

function compile(filename, callback) {
    readAST(filename, onAST)

    function onAST(err, ast) {
        if (err) {
            return callback(err)
        }

        var meta = Meta(ast, filename)

        verify(ast, meta, callback)
    }
}

function readAST(filename, callback) {
    fs.readFile(filename, 'utf8', function (err, content) {
        if (err) {
            return callback(err)
        }

        callback(null, esprima.parse(content))
    })
}
