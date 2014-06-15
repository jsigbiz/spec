module.exports = variableDeclarator

function variableDeclarator(node, meta, callback) {
    console.log('node', node)

    // var id = node.id.name

    callback(null)
}
