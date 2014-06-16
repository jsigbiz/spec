module.exports = FunctionMeta

/*  FunctionMeta is threaded through every verifier which
    veirfiers that an AST node inside a function body is
    type sound

    This is a place to put meta data about the state of the
    function so taht each node in the AST can access it.

    Currently it is 

    {
        parent: MetaObject,
        identifiers: Object<String, {
            type: 'variable' | 'function',
            jsig: JsigASTNode
        }>,
        returnValueType: JsigASTNode,
        type: 'function'
    }
*/
function FunctionMeta(parentMeta) {
    if (!(this instanceof FunctionMeta)) {
        return new FunctionMeta(parentMeta)
    }

    this.parent = parentMeta
    this.identifiers = Object.create(parentMeta.identifiers)
    this.returnValueType = null
    this.type = 'function'
}
