module.exports = identifier

function identifier(node, meta, callback) {
    var name = node.name
    var type = meta.identifiers[name] &&
        meta.identifiers[name].jsig

    if (!type) {
        console.warn('could not find type for identifier',
            name)
        return callback(null)
    }

    callback(null, type)
}
