module.exports = binaryExpression

function binaryExpression(node, meta, callback) {
    console.log('binaryExpression', node)

    // must verify that invoking the operator of the expression
    // is sound. Similar to how we verify callExpression

    callback(null)
}
