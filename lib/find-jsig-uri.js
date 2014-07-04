var fs = require('fs')
var path = require('path')

findJsigUri.sync = findJsigUriSync

module.exports = findJsigUri

function findJsigUri(uri, cb) {
    findPackage(uri, function (err, package) {
        if (err) {
            return cb(err)
        }

        if (!package) {
            return cb(null, null)
        }

        var tuple = getJsigUri(package)
        if (!tuple.found) {
            return findJsigUri(tuple.dirname, cb)
        }

        cb(null, tuple.uri)
    })
}

function findJsigUriSync(uri) {
    var package = findPackageSync(uri)
    if (!package) {
        return null
    }

    var tuple = getJsigUri(package)
    if (!tuple.found) {
        return findJsigUriSync(tuple.dirname)
    }

    return tuple.uri
}

function getJsigUri(package) {
    var dirname = package[0]
    package = package[1]

    if (!package['main.jsig']) {
        return { found: false, dirname: dirname }
    }

    return {
        found: true,
        uri: path.join(dirname, package['main.jsig'])
    }
}

function findPackage(uri, cb) {
    var dirname = path.dirname(uri)
    var file = path.basename(dirname)
    if (dirname === '/' || file === 'node_modules') {
        return cb(null, null)
    }

    var package = path.join(dirname, 'package.json')
    fs.readFile(package, 'utf8', function (err, content) {
        if (err) {
            if (err.code === 'ENOENT') {
                return findPackage(dirname, cb)
            }
            return cb(err)
        }

        var json = JSON.parse(content)
        cb(null, [dirname, json])
    })
}

function findPackageSync(uri) {
    var dirname = path.dirname(uri)
    var file = path.basename(dirname)
    if (dirname === '/' || file === 'node_modules') {
        return null
    }

    var package = path.join(dirname, 'package.json')
    if (fs.existsSync(package)) {
        return [dirname, JSON.parse(fs.readFileSync(package, 'utf8'))]
    }

    return findPackageSync(dirname)
}

