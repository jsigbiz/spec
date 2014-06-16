module.exports = findByIdentifier

function findByIdentifier(program, identifier) {
    if (program.type !== 'program') {
        throw new Error('invalid argument program')
    }

    var statements = program.statements
    var assignments = statements.filter(function (node) {
        return node.identifier === identifier &&
            node.type === 'assignment'
    })

    return assignments[0]
}
