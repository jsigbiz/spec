type GenericE := {
    type: "genericLiteral",
    value: TypeExpression,
    generics: Array<TypeExpression>,
    label: String | null,
    optional: Boolean
}

type FunctionE := {
    type: "function",
    args: Array<TypeExpression>,
    result: TypeExpression,
    thisArg: TypeExpression | null,
    label: String | null,
    optional: Boolean
}

type ValueE := {
    type: "valueLiteral",
    value: String,
    name: String,
    label: String | null,
    optional: Boolean
}

type LiteralE := {
    type: "typeLiteral",
    name: String,
    builtin: Boolean,
    label: String | null,
    optional: Boolean
}

type UnionE := {
    type: "unionType",
    unions: Array<TypeExpression>,
    label: String | null,
    optional: Boolean
}

type KeyValue := {
    type: "keyValue",
    key: String,
    value: TypeExpression
}

type ObjectE := {
    type: "object",
    keyValues: Array<KeyValue>,
    label: String | null,
    optional: Boolean
}

type TypeExpression :=
    ObjectE | UnionE | LiteralE | FunctionE | ValueE | GenericE

type Assignment := {
    type: "assignment",
    identifier: String,
    typeExpression: TypeExpression
}

type TypeDeclaration := {
    type: "typeDeclaration",
    identifier: String,
    typeExpression: TypeExpression
}

type Statement := TypeDeclaration | Assignment

type Program := {
    type: "program",
    statements: Array<Statement>
}
