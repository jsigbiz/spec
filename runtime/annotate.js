// must export to analyse circular code. i.e. code that annotate
// uses.
module.exports = annotate

var fs = require('fs')
var path = require('path')
var Parsimmon = require('parsimmon')

var program = require('../parser/program.js')
var enforceTypeExpression = require('./enforce-type-expression')


function annotate(object, jsigUri, filename) {
    var ast = getAST(jsigUri)
    var identifier = getIdentifier(jsigUri, filename)
    var shape = findByIdentifier(ast, identifier)

    if (!shape) {
        return object
    }

    return enforceTypeExpression(shape.typeExpression, object,
        shape.identifier)
}

function findByIdentifier(program, identifier) {
    if (program.type !== 'program') {
        throw new Error('invalid argument program')
    }

    var statements = program.statements
    var assignments = statements.filter(function (node) {
        return node.identifier === identifier &&
            node.type === 'assignment'
    })

    return assignments[0]
}

function getAST(jsigUri) {
    var jsig = fs.readFileSync(jsigUri, 'utf8')

    var parseRes = program.parse(jsig)

    if (!parseRes.status) {
        var message = Parsimmon.formatError(jsig, parseRes)
        throw new Error(message)
    }

    return parseRes.value
}

function getIdentifier(jsigUri, filename) {
    var jsigFolder = path.dirname(jsigUri)
    var relativeUri = path.relative(jsigFolder, filename)
    var extName = path.extname(relativeUri)

    var identifier = relativeUri.substr(0,
        relativeUri.length - extName.length)
    var base = path.basename(jsigFolder)

    if (identifier === 'index') {
        identifier = base
    } else {
        identifier = base + '/' + identifier
    }

    return identifier
}
