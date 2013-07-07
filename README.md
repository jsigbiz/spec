# jsig - precise & concise JavaScript signature notation

## Stability Note

This specification is a draft. The spirit of what we intend to capture is here, but the exact wording is still being ironed out. Expect change. Please participate with your comments and feedback.

## Motivation

JavaScript is a a dynamically typed language. Most of the time, this is great - this flexibility lets us write things like `"I'm " + thisMany` and have it work whether `thisMany === 'five'` or `thisMany === 5`. But sometimes it helps to have a vocabulary for explicitly stating expectations about the values and objects our code is expecting, especially when writing documentation for other humans.

JSDoc is a attempts to solve this, but falls short by limiting itself to built in types and instanceof constructors. In particular, it is difficult to describe function signatures for callbacks and objects with a certain set of properties.

jsig is a system of notation using structure-based type annotations to describe JavaScript interfaces. It aims to be explicit, concise, and familiar for those used to JavaScript syntax.

The goal of this system of annotation is not necessarily to be computable but to aid communication between programmers.

## Example

```js
/*  reduce := (array: Array<A>,
        reducer: (accumulated: B, elem: A) => B, seed: B?) => B
*/
function reduce(array, reducer, seed) {
  return array.reduce(reducer, seed)
}
```

Read through for further examples. Please contribute your own via a pull request.

## Specification

`jsig` specifies values and describes their types. It can be used to describe a single value, for example a variable or a configuration object. It can also describe a function as a value, and its relationship between its parameters and a return value. This relationship is called the function's signature. It can also be used to create named types to be used in other signatures

### Basic Types

The built in JavaScript constructor functions describe basic types: String, Array, RegExp, etc. For example, in JavaScript we can describe a bicycle like so:

```js
var bicycle = {
  gears: 10,
  tires: 'hydrid',
  color: 'white',
  lastUsed: new Date()
}
```

In `jsig` we can make statements about this object.

```ocaml
bicycle := {
  gears: Number,
  tires: String,
  color: String,
  lastUsed: Date
}
```

### Generic Types

Some types of values can be described as generic, or "types of types." For example, the JavaScript value:

```js
var cats = ['tabby', 'shorthair', 'calico', 'persian']
```

could be described as an "array of strings." In `jsig` this is expressed as `Array<String>`.

Formally, the generic type preceeds the specific type, which is surrounded by angle brackets `<`,`>`. This notation should be familiar to users of Java or C#. Here, we borrow the notation for the purpose of simplifying otherwise quite verbose notations. Consider Callbacks or Continuables in asynchronous JavaScript programming.

In Node.js, we can read a file using `fs.readFile`. We could write this signature (simplified) as:

```ocaml
readFile := (filename: String, options: Object?,
    callback: (err: Error, content: Buffer) => void) => void
```

or we could create a generic `Callback<Type>` notation and write:

```ocaml
type Callback<T> := (err: Error, value: T) => void

readFile := (filename: String, options: Object?, callback: Callback<Buffer>)
```

Using Continuable values, we could simplify and clarify the type signature even further to:

```ocaml
type Callback<T> := (err: Error, value: T) => void
type Continuable<T> := (callback: Callback<T>) => void

readFile := (filename: String, options: Object?) => Continuable<Buffer>
```

Generic types should be fully specified as a Custom Type (see below). In the custom type definition, any symbol may be used inside the angle brackets and should be internally consistent in the definition. In this example, the definition for generic Callback would be:

```ocaml
type Callback<T> := (err: Error, value: T) => void
```

Multiple generic types may be specified if necessary. Type parameters should be separated by a comma, e.g.:

```ocaml
Generic<Type1, Type2>
```

For example objects are actually generic types `Object<String, Any>`

### Custom Types

When describing an object with a well-defined interface (for example, from a constructor function or an interface specification like Promises/A+), this name should appear in PascalCase and should refer either to the name of the constructor or should otherwise be obvious in context (eg, ReadStream or HttpClientRequest in Node.js or DOMElement in a browser).

```js
// endpoint := (req: HttpServerRequest, res: HttpServerResponse) => void
function endpoint(req, res) {
  res.end('foobar')
}
```

Custom types can be defined using the type definition operator `type` and should be named PascalCase:

```ocaml
type User := { id: Number, name: String, email: String }
```

### Special Types

#### Any Value

Values that may be of any type (or unspecified type) should be written as:

```ocaml
Any
```

#### No Value

No value (for example, a function which does not return) should be specified using the JavaScript keyword `void`

```ocaml
void
```

#### Literal value

Literal values should be specified using their JavaScript literals, eg `null`, `true`, `false`

### Multiple Types

When a value may be of multiple types, the types may be joined by a pipe character `|` (read as logical "or"):

```js
// greet := (names: String | Array<String>) => void
function greet(names) {
  if (!Array.isArray(names)) {
    console.log('hey ' + names)
  } else {
    console.log('hey ' + names.join(', '))
  }
}
```

### Compound Types (or "extends", "mixins", etc)

When a value should have multiple types (eg, when combining multiple interfaces), these types may be joined by an ampersand character `&` (read as logical "and"):

```ocaml
type Response := ReadableStream & { statusCode: Number }
```

Compound types and Multiple types can use parenthesis to make associativity explicit, although for the sake of clarity it may be beneficial to use named CustomTypes or explicitly list each signature combination.

You can also use compound typing to define functions which have multiple execution paths

```js
/*  getOrSet := (Object, String) => T &
        (Object, String, T) => void
*/
function getOrSet(obj, key, value) {
  if (value) {
    obj[key] = value
  } else {
    return obj[key]
  }
}
```

Here we are defining both signatures of this function in one definition

### Function Signatures

Functions are specified using proposed ES6 arrow notation:

```ocaml
(param, param2) => Type
```

To specify any function, use the builtin constructor `Function`.

Return types must be specified.

#### Paramaters

A function signature consists of '(' , a list of paramaters and a ')'. Each paramater must have a type

```ocaml
add := (Number, Number) => Number
```

#### Labels

Any type reference (including function signatures) may be labeled for readability purposes. The label name is seperated from the type by a colon. Whitespace is ignored. results can also be labelled but that's uncommon

```ocaml
add := (left: Number, right: Number) => result: Number
```

#### Variadic (variable number of parmeters) functions

When a function accepts an arbitrary number of parameters of the same type, they may be specified with ES6 Rest Parameter syntax, consisting of three periods before the parameter name:

```js
// petOwner := (name: String, ...pets: String) => Any
function petOwner(name) {
  var pets = Array.prototype.slice.call(arguments)
  pets.shift()
  console.log(name + ' owns ' + pets.join(', '))
}
```

#### Return types

Functions should return a single type, indicated after the arrow notation, eg `() => Type`. If a function returns different types depending on the parameters, then you should use the compound function signature definition:

```ocaml
fooAsync := (Callback<T>) => void & () => Promise<T>
```

Functions which do not return a type should be specified as `() => void`

### Optional

When describing a function's parameters list, an optional parameter can be specified by appending a question mark `?` to the type annotation:

```js
// get := (requestUrl: String, timeout: Number?) => Promise<String>
function get(requestUrl, timeout) {
  // do stuff
}
```

### Tuples

Arrays with a specific number of typed elements can be specified using JavaScript array literal notation with types matching the element indices:

```ocaml
type Point := [x: Number, y: Number, z: Number]
```

### Enum

Sometimes you want to say a type is a large OR expression over a whitelist of possible values. The Enum type is used to make this more explicit.

```ocaml
type Delta := {
  id: String,
  type: Enum("create", "update", "delete"),
  changes: Object
}
```

### Structure Objects

An object with certain properties is expressed as a JavaScript object literal with property names corresponding to the names on the expected object:

```js
// log := ({ stderr: ReadStream, stdout: ReadStream }) => void
function log(stdio) {
  file = require('fs').createWriteStream('io.log')
  stdio.stdout.pipe(file)
  stdio.stderr.pipe(file)
}
```

Optional properties can be indicated by a `?` following the type:

```js
// hasEmail := (user: { id: Number, email: String? }) => Boolean
function hasEmail(user) {
  return user.hasOwnProperty('email')
}
```

## Contributors

jden <jason@denizac.org>
raynos <raynos2@gmail.com>

## License

Public Domain.

<a rel="license"
   href="http://creativecommons.org/publicdomain/zero/1.0/">
  <img src="http://i.creativecommons.org/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" />
</a>

To the extent possible under law, all copyright and related or neighboring rights to this work have been waived. This work is published from: United States.
