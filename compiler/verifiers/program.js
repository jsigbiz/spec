var series = require('run-series')
var fs = require('fs')

var parser = require('../../parser.js')
var findJsigUri = require('../../lib/find-jsig-uri.js')
var isModuleExports = require('../../lib/is-module-exports.js')
var verify = require('../verify.js')

module.exports = program

function program(node, meta, callback) {
    var body = hoistFunctionDeclaration(node.body)

    var moduleExports = body.filter(isModuleExports)[0]
    if (moduleExports) {
        var right = moduleExports.expression.right
        meta.moduleExportsNode = right
    }

    findJsigUri(meta.filename, function (err, jsigUri) {
        if (err) {
            return callback(err)
        }

        if (jsigUri) {
            meta.jsigUri = jsigUri
            fs.readFile(jsigUri, 'utf8',  onfile)
        } else {
            handleBody()
        }

        function onfile(err, content) {
            if (err) {
                return callback(err)
            }

            parser(content, handleBody)
        }
    })

    function handleBody(err, jsigAst) {
        if (err) {
            return callback(err)
        }

        if (jsigAst) {
            meta.jsigAst = jsigAst
        }

        var tasks = body.map(function (node) {
            return verify.bind(null, node, meta)
        })

        series(tasks, callback)
    }
}

// hoisting function declarations to the top makes the tree
// order algorithm simpler
function hoistFunctionDeclaration(nodes) {
    var declarations = nodes.filter(function (node) {
        return node.type === 'FunctionDeclaration'
    })
    var other = nodes.filter(function (node) {
        return node.type !== 'FunctionDeclaration'
    })

    return [].concat(declarations, other)
}
