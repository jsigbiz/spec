var checkers = {
    'typeLiteral': checkTypeLiteral
}

module.exports = checkSubType

// returns Error or null
function checkSubType(parent, child) {
    if (checkers[parent.type]) {
        return checkers[parent.type](parent, child)
    } else {
        console.warn('skipping check sub type', parent.type)
    }
}

function checkTypeLiteral(parent, child) {
    if (!parent.builtin) {
        console.warn('skipping non builtin type literal')
        return
    }

    if (child.type !== 'typeLiteral') {
        console.warn('skipping non typeLiteral child',
            child.type)
        return
    }

    var name = parent.name

    if (name === 'String') {
        if (child.name !== 'String') {
            return new Error('expected string got ' + child.name)
        }
    } else {
        console.warn('skipping other builtins', name)
    }
}
