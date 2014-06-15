module.exports = functionDeclaration

/*  must verify this function is type sound.

    easy mode: find the identifier of this function in the
        identifiers table that has been populated by the
        jsigAst then verify that type is met

    hard mode: use type inference to generate a jsig AST for
        this function declaration. Then store that jsig AST
        in the identifiers table

    The way we check this thing is good recursively is creating
        a new meta object with a identifiers object with the
        types of the function parameters pre-populated and 
        a __proto__ that is the module-level identifiers.

    i.e. we should call verify on the body of the function
        with a meta object that prototypically inherits from
        the outer meta object

*/
function functionDeclaration(node, meta, callback) {
    console.log('node', node)

    callback(null)
}
