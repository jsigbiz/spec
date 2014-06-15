var fs = require('fs')
var path = require('path')

findJsigUri.sync = findJsigUriSync

module.exports = findJsigUri

function findJsigUri(uri, cb) {
    findPackage(uri, function (err, package) {
        if (err) {
            return cb(err)
        }

        cb(null, getJsigUri(package))
    })
}

function findJsigUriSync(uri) {
    var package = findPackageSync(uri)
    return getJsigUri(package)
}

function getJsigUri(package) {
    if (package === null) {
        return null
    }

    var dirname = package[0]
    package = package[1]

    if (!package['main.jsig']) {
        return null
    }

    return path.join(dirname, package['main.jsig'])
}

function findPackage(uri, cb) {
    var dirname = path.dirname(uri)
    if (dirname === '/') {
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
    if (dirname === '/') {
        return null
    }

    var package = path.join(dirname, 'package.json')
    if (fs.existsSync(package)) {
        return [dirname, JSON.parse(fs.readFileSync(package, 'utf8'))]
    }

    return findPackageSync(dirname)
}

