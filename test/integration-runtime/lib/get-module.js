var path = require('path')

var cover = require('../../../bin/cover.js')

module.exports = getModule

function getModule(folder, file) {
    file = file || 'index.js'

    var uri = path.join(__dirname, '..', folder, file)

    // require runtime for code coverage
    require('../../../runtime/annotate.js')

    return cover({ _: [uri] })
}
