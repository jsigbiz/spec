/*global global*/

var hook = require('node-hook')
var path = require('path')
var falafel = require('falafel')

var findJsigUriSync = require('../lib/find-jsig-uri').sync
var isModuleExportsStatement =
    require('../lib/is-module-exports.js')

var annotateUri = path.join(__dirname, '..',
    'runtime', 'annotate.js')

module.exports = annotate

function annotate(opts, cb) {
    var file = opts._[0]

    if (!file) {
        cb(new Error('must pass file argument'))
    }

    hook.hook('.js', interceptAndInstrument)

    var res = require(path.resolve(file))

    hook.unhook('.js')

    if (cb) {
        cb(null, res)
    }

    return res
}

function interceptAndInstrument(source, filename) {
    var jsigUri = findJsigUriSync(filename)

    // do not annotate the annotator file, thats silly
    if (filename === annotateUri ||
        global.JSIG_ANNOTATE_SKIP
    ) {
        return source
    }

    var prefix = 'var jsigAnnotate = require("' +
        annotateUri + '")\n'


    var res = prefix + falafel(source, function (node) {
        if (!isModuleExportsStatement(node)) {
            return
        }

        var expression = node.expression

        var newSource = 'jsigAnnotate(' +
            expression.right.source() +
            ', ' + JSON.stringify(jsigUri) +
            ', ' + JSON.stringify(filename) + ')'

        expression.right.update(newSource)
    })

    return res
}


