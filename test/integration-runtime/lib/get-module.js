var path = require('path')

var annotate = require('../../../bin/annotate.js')

module.exports = getModule

function getModule(folder, file) {
    file = file || 'index.js'

    var uri = path.join(__dirname, '..', folder, file)

    // require runtime for code coverage
    require('../../../runtime/annotate.js')

    return annotate({ _: [uri] })
}
