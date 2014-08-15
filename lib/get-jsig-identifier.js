var path = require('path')

module.exports = getIdentifier

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
