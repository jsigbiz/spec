var difflet = require('difflet')({ indent: 1 })

module.exports = showDiff

function showDiff(left, right) {
    var diffC = difflet.compare(left, right)

    console.log(diffC)

    return diffC
}
