module.exports = id

function id(x) {
    // This case is a bug in id()
    // since its supposed to return number / string
    if (x === 9001) {
        return true
    }

    return x
}
