module.exports = isModuleExportsStatement

function isModuleExportsStatement(node) {
    if (node.type !== 'ExpressionStatement') {
        return
    }

    var expression = node.expression

    if (expression.type !== 'AssignmentExpression') {
        return
    }

    if (expression.operator !== '=') {
        return
    }

    var left = expression.left

    if (left.type !== 'MemberExpression') {
        return
    }

    if ((left && !left.object) ||
        (left && left.object && left.object.name !== 'module')
    ) {
        return
    }

    if ((left && !left.property) ||
        (left && left.property &&
            left.property.name !== 'exports')
    ) {
        return
    }

    return true
}
