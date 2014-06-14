var hook = require('node-hook')
var fs = require('fs')
var path = require('path')
var falafel = require('falafel')

var annotateUri = path.join(__dirname, '..',
    'runtime', 'annotate.js')

module.exports = cover

function cover(opts, cb) {
    var file = opts._[0]

    if (!file) {
        cb(new Error('must pass file argument'))
    }

    hook.hook('.js', interceptAndInstrument)

    var res = require(path.resolve(file))

    hook.unhook('.js')

    return res
}

function interceptAndInstrument(source, filename) {
    var package = findPackage(filename)
    if (package === null) {
        return source
    }

    

    var dirname = package[0]
    package = package[1]

    if (!package['main.jsig']) {
        return source
    }

    var jsigUri = path.join(dirname, package['main.jsig'])
    // cannot annotate the annotator. must self reference
    var prefix = filename === annotateUri ?
        'var jsigAnnotate = annotate\n' :
        'var jsigAnnotate = require("' +
            annotateUri + '")\n'

    var res = prefix + falafel(source, function (node) {
        if (!isModuleExportsStatement(node)) {
            return
        }

        var newSource = 'jsigAnnotate(' + node.right.source() +
            ', ' + JSON.stringify(jsigUri) +
            ', ' + JSON.stringify(filename) + ')'

        node.right.update(newSource)
    })

    return res
}

function findPackage(uri) {
    var dirname = path.dirname(uri)
    var package = path.join(dirname, 'package.json')
    if (fs.existsSync(package)) {
        return [dirname, JSON.parse(fs.readFileSync(package, 'utf8'))]
    }

    if (dirname === '/') {
        return null
    }

    return findPackage(dirname)
}

function isModuleExportsStatement(node) {
    if (node.type !== 'AssignmentExpression') {
        return
    }

    if (node.operator !== '=') {
        return
    }

    if (node.left.type !== 'MemberExpression') {
        return
    }

    if (!node.left ||
        node.left && !node.left.object ||
        node.left && node.left.object &&
            node.left.object.name !== 'module'
    ) {
        return
    }

    if (!node.left ||
        node.left && !node.left.property ||
        node.left && node.left.property &&
            node.left.property.name !== 'exports'
    ) {
        return
    }

    return true
}
