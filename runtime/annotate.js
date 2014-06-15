var fs = require('fs')
var path = require('path')

var parser
var enforceTypeExpression

// must export to analyse circular code. i.e. code that annotate
// uses.
module.exports = annotate

// lazy require to break circular reference
parser = require('../parser.js')

// lazy require to break circular references
enforceTypeExpression = require('./enforce-type-expression')

function annotate(object, jsigUri, filename) {
    var ast = getAST(jsigUri)
    var identifier = getIdentifier(jsigUri, filename)
    var shape = findByIdentifier(ast, identifier)

    if (!shape) {
        return object
    }

    // lazy require to break circular references
    enforceTypeExpression = require('./enforce-type-expression')

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

    // lazy require to break circular reference
    parser = require('../parser.js')

    return parser(jsig)
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
