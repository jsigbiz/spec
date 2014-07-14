'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');

// var showDiff = require('../lib/show-diff.js');

var parse = require('../../../parser.js');
var AST = require('../../../ast.js');

var uri = path.join(__dirname, 'definitions',
    'continuable-mongo.mli');
var content = fs.readFileSync(uri, 'utf8');

var ASTFixture = AST.program([
    AST.importStatement('node.jsig', [
        AST.literal('Stream')
    ]),
    AST.importStatement('continuable.jsig', [
        AST.literal('Continuable')
    ]),
    AST.importStatement('mongodb.jsig', [
        AST.renamedLiteral('MongoCursor', 'Cursor'),
        AST.renamedLiteral('MongoCollection', 'Collection'),
        AST.renamedLiteral('MongoDB', 'DB')
    ]),
    AST.typeDeclaration('Cursor',
        AST.intersection([
            AST.object({
                'toArray': AST.functionType({
                    result: AST.generic(
                        AST.literal('Continuable'),
                        [AST.generic(
                            AST.literal('Array'),
                            [AST.literal('T')]
                        )]
                    )
                }),
                'nextObject': AST.functionType({
                    result: AST.generic(
                        AST.literal('Continuable'),
                        [AST.union([
                            AST.literal('T'),
                            AST.value('null')
                        ])
                    ])
                }),
                'stream': AST.functionType({
                    result: AST.literal('Stream')
                })
            }),
            AST.functionType({
                args: [AST.generic(
                    AST.literal('Callback'),
                    [AST.literal('MongoCursor')]
                )],
                result: AST.literal('void')
            })
        ]),
        [AST.literal('T')]
    ),
    AST.typeDeclaration('Client', AST.intersection([
        AST.object({
            'close': AST.generic(
                AST.literal('Continuable'),
                [AST.literal('void')
            ]),
            'collection': AST.functionType({
                args: [AST.literal('String', 'name')],
                result: AST.literal('Collection')
            })
        }),
        AST.functionType({
            args: [AST.generic(
                AST.literal('Callback'),
                [AST.literal('MongoDB')]
            )],
            result: AST.literal('void')
        })
    ]))
]);

test('the error type definition', function t(assert) {
    var result = parse(content);

    // showDiff(result, ASTFixture);
    assert.deepEqual(result, ASTFixture);

    assert.end();
});


// type Collection<T> := (Callback<MongoCollection>) => void & {
//     find: (selector: Object, options: Object?) => Cursor<T>,
//     findById: (id: String, options: Object?) => Continuable<T>,
//     findAndModify: (selector: Object, sort: Array?, doc: Object?,
//         options: Object?) => Continuable<T>,
//     findAndRemove: (selector: Object, sort: Array?, options: Object?) =>
//         Continuable<T>
//     findOne: (selector: Object, options: Object?) => Continuable<T>,
//     insert: (docs: Array<T>, options: Object?) =>
//         Continuable<Array<T>>,
//     mapReduce: (map: Function, reduce: Function, options: Object?) =>
//         Continuable<Collection>,
//     remove: (selector: Object, options: Object?) =>
//         Continuable<Number>,
//     update: (selector: Object, doc: Object?, options: Object?) =>
//         Continuable<Number>
// }



// continuable-mongo/cursor := (Collection<T>) =>
//     (selector: Object, options: Object?) => Cursor<T>

// continuable-mongo/collection := (Client) =>
//     (collectionName: String) => Collection

// continuable-mongo := (uri: String, options: Object?) => Client
