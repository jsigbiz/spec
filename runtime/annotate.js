/*global global*/
var fs = require('fs')

var jsigAstCache = {}
var IN_ANNOTATE_MODE = false
global.JSIG_ANNOTATE_SKIP = true

// must export to analyse circular code. i.e. code that annotate
// uses.
module.exports = annotate

var getIdentifier = requireClean('../lib/get-jsig-identifier.js')
var findByIdentifier =
    requireClean('../lib/find-by-jsig-identifier.js')
var parser = requireClean('../parser.js')
var enforceTypeExpression =
    requireClean('./enforce-type-expression')

global.JSIG_ANNOTATE_SKIP = false

function annotate(object, jsigUri, filename) {
    var _fn = null

    function Empty() {}

    // do lazy for function
    if (typeof object === 'function') {
        return proxy
    }

    return _annotate(object, jsigUri, filename)

    function proxy() {
        var res

        if (IN_ANNOTATE_MODE) {
            if (this instanceof proxy) {
                res = object.apply(this, arguments)
                if (Object(res) === res) {
                    return res
                }
                return this
            }

            return object.apply(this, arguments)
        }

        if (!_fn) {
            var constr = this instanceof proxy

            if (object.prototype) {
                Empty.prototype = object.prototype;
                proxy.prototype = new Empty();
                Empty.prototype = null;
            }

            Object.keys(object).forEach(function (key) {
                proxy[key] = object[key]
            })

            IN_ANNOTATE_MODE = true
            _fn = _annotate(object, jsigUri, filename)
            IN_ANNOTATE_MODE = false

            if (constr) {
                return proxy.apply(
                    Object.create(proxy.prototype),
                    arguments)
            }

            return proxy.apply(this, arguments)
        }

        if (this instanceof proxy) {
            res = _fn.apply(this, arguments)
            if (Object(res) === res) {
                return res
            }
            return this
        }

        return _fn.apply(this, arguments)
    }
}

function _annotate(object, jsigUri, filename) {
    if (!jsigUri) {
        // cannot determine anything without jsigUri
        return object
    }

    var ast = getAST(jsigUri)
    var identifier = getIdentifier(jsigUri, filename)
    var shape = findByIdentifier(ast, identifier)

    if (!shape) {
        // console.warn('could not find shape', filename, jsigUri);
        return object
    }

    return enforceTypeExpression(shape.typeExpression, object,
        shape.identifier)
}

function getAST(jsigUri) {
    if (jsigAstCache[jsigUri]) {
        return jsigAstCache[jsigUri]
    }

    var jsig = fs.readFileSync(jsigUri, 'utf8')
    var ast = parser(jsig)

    jsigAstCache[jsigUri] = ast

    return ast
}


function requireClean(uri) {
    var oldCache = Object.keys(require.cache)

    var mod = require(uri)

    Object.keys(require.cache).forEach(function (key) {
        if (oldCache.indexOf(key) === -1) {
            delete require.cache[key]
        }
    })

    return mod
}
