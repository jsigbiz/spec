# jsig - precise & concise JavaScript signature notation

## v 0.1.0

*Stability Note* - This specification is a draft. The spirit of what we intend to capture is here, but the exact wording is still being ironed out. Expect change. Please participate with your comments and feedback.

## Motivation

JavaScript is a a dynamically typed language. Most of the time, this is great - this flexibility lets us write things like `"I'm " + thisMany` and have it work whether `thisMany === 'five'` or `thisMany === 5`. But sometimes it helps to have a vocabulary for explicitly stating expectations about the values and objects our code is expecting, especially when writing documentation for other humans.

JSDoc is a attempts to solve this, but falls short by limiting itself to built in types and instanceof constructors. In particular, it is difficult to describe function signatures for callbacks and objects with a certain set of properties.

jsig is a system of notation using structure-based type annotations to describe JavaScript interfaces. It aims to be explicit, concise, and familiar for those used to JavaScript syntax.

The goal of this system of annotation is not necessarily to be computable but to aid communication between programmers.

## Example

    // (array: Array, (accumulated: Any, elem: Any) => Any, seed: Any) => Any
    function reduce(array, reducer, seed) {
      return array.reduce(reducer, seed);
    }

Read through for further examples. Please contribute your own via a pull request.

## Specification

`jsig` specifies values and describes their types. It can be used to describe a single value, for example a variable or a configuration object. It can also describe a function as a value, and its relationship between its parameters and a return value. This relationship is called the function's signature. It can also be used to create named types to be used in other signatures

### Basic Types

The built in JavaScript constructor functions describe basic types: String, Array, RegExp, etc. For example, in JavaScript we can describe a bicycle like so:

    var bicycle = {
      gears: 10,
      tires: 'hydrid',
      color: 'white',
      lastUsed: new Date()
    }

In `jsig` we can make statements about this object.

    bicycle : {
      gears: Number,
      tires: String,
      color: String,
      lastUsed: Date
    }

### Generic Types

Some types of values can be described as generic, or "types of types." For example, the JavaScript value:

    var cats = ['tabby', 'shorthair', 'calico', 'persian']

could be described as an "array of strings." In `jsig` this is expressed as `Array<String>`.

Formally, the generic type preceeds the specific type, which is surrounded by angle brackets `<`,`>`. This notation should be familiar to users of Java or C#. Here, we borrow the notation for the purpose of simplifying otherwise quite verbose notations. Consider Callbacks or Promises in asynchronous JavaScript programming.

In Node.js, we can read a file using `fs.readFile`. We could write this signature (simplified) as:

    readFile (filename: String, options?: Object, callback: (err: Error, contents: Buffer)) => void`

or we could create a generic `Callback<Type>` notation and write:

    readFile (filename: String, options?: Object, callback: Callback<Buffer>)

Using Promise values, we could simplify and clarify the type signature even further to:

    readFile (filename: String, options?: Object) => Promise<Buffer>

Generic types should be fully specified as a Custom Type (see below). In the custom type definition, any symbol may be used inside the angle brackets and should be internally consistent in the definition. In this example, the definition for generic Callback would be:

    Callback<T>: (err: Error, result: T) => void

Multiple generic types may be specified if necessary. Type parameters should be separated by a comma, e.g.:

    Generic<Type1, Type2>

### Custom Types

When describing an object with a well-defined interface (for example, from a constructor function or an interface specification like Promises/A+), this name should appear in PascalCase and should refer either to the name of the constructor or should otherwise be obvious in context (eg, ReadStream or HttpClientRequest in Node.js or DOMElement in a browser).

    // (req: HttpServerRequest, res: HttpServerResponse) => void
    function endpoint(req, res) {
      res.end('foobar')
    }

Custom types can be named like function parameters using a colon character `:`, and should use PascalCase:

    User: {id: Number, name: String, email: String}

### Special Types

#### Any Value

Values that may be of any type (or unspecified type) should be written as:

    Any

#### No Value

No value (for example, a function which does not return) should be specified using the JavaScript keyword `void`

    void

#### Literal value

Literal values should be specified using their JavaScript literals, eg `null`, `true`, `false`

### Multiple Types

When a value may be of multiple types, the types may be joined by a pipe character `|` (read as logical "or"):

    // (names: String|Array<String>) => void
    function greet(names) {
      if (!Array.isArray(names)) {
        console.log('hey ' + names)
      } else {
        console.log('hey ' + names.join(', '))
      }
    }

### Compound Types (or "extends", "mixins", etc)

When a value should have multiple types (eg, when combining multiple interfaces), these types may be joined by an ampersand character `&` (read as logical "and"):

    Response: ReadStream & {statusCode: Number}

Compound types and Multiple types can use parenthesis to make associativity explicit, although for the sake of clarity it may be beneficial to use named CustomTypes or explicitly list each signature combination.

### Function Signatures

Functions are specified using proposed ES6 arrow notation:

    (param, param2) => Type

To specify any function, use the builtin constructor `Function`.

Return types must be specified.

Functions may be named by preceeding the parentheses with the function name. When written as a comment above the funciton definition, this is typically omitted.

    getElementById(String) => DOMElement

#### Parameters

Parameters may be named for clarity and documentation purposes. The parameter name is separated from the type by a colon. Whitespace is ignored. The parameter name is optional, but a type must be specified.

    // anonymous signature
    (String, Number) => Boolean


    // named signature
    isMinLength(str: String, min: Number) => Boolean

#### Variadic (variable number of parmeters) functions

When a function accepts an arbitrary number of parameters of the same type, they may be specified with ES6 Rest Parameter syntax, consisting of three periods before the parameter name:

    (name: String, ...pets: String) => Any
    function petOwner(name) {
      var pets = Array.prototype.slice.call(arguments)
      pets.shift()
      console.log(name + ' owns ' + pets.join(', '))
    }

#### Return types

Functions should return a single type, indicated after the arrow notation, eg `() => Type`. If a function returns different types depending on the parameters, this should be explicitly noted and each function signature should be fully specified:

    fooAsync(callback: Function) => void
    fooAsync() => Promise


Functions which do not return a type should be specified as `() => void`


### Optional

When describing a function's parameters list, an optional parameter can be specified by appending a question mark `?` to either the parameter name (if named) or the type annotation:

    // (requestUrl: String, timeout: Number?) => Promise<String>
    function get(requestUrl, timeout) {
      // do stuff
    }

### Tuples

Arrays with a specific number of typed elements can be specified using JavaScript array literal notation with types matching the element indices:

    point: [x: Number, y: Number, z: Number]

### Structure Objects

An object with certain properties is expressed as a JavaScript object literal with property names corresponding to the names on the expected object:

    // ({stderr: ReadStream, stdout: ReadStream }) => void
    function log(stdio) {
      file = require('fs').createWriteStream('io.log')
      stdio.stdout.pipe(file)
      stdio.stderr.pipe(file)
    }

Optional properties can be indicated by a `?` following the name:

    // (user: {id: Number, email?: String}) => Boolean
    function hasEmail(user) {
      return user.hasOwnProperty('email')
    }

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
