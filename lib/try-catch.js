module.exports = tryCatch

function tryCatch(fn) {
    try {
        return [null, fn()]
    } catch(err) {
        return [err]
    }
}
