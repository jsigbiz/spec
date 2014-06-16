// circular require buster
module.exports = compile

var readAST = require('./lib/read-ast.js')
var verify = require('./verify.js')
var ProgramMeta = require('./program-meta.js')

function compile(filename, callback) {
    readAST(filename, onAST)

    function onAST(err, ast) {
        if (err) {
            return callback(err)
        }

        var meta = ProgramMeta(ast, filename)

        verify(ast, meta, function (err) {
            if (err) {
                return callback(err)
            }

            callback(null, meta)
        })
    }
}

