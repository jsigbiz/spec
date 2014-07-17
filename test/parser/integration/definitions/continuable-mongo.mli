import { Stream } from "node.jsig"
import { Continuable } from "continuable.jsig"
import {
    Cursor as MongoCursor,
    Collection as MongoCollection,
    DB as MongoDB
} from "mongodb.jsig"

type Cursor<T> : {
    toArray: () => Continuable<Array<T>>,
    nextObject: () => Continuable<T | null>,
    stream: () => Stream
} & (Callback<MongoCursor>) => void

type Client : {
    close: Continuable<void>,
    collection: (name: String) => Collection
} & (Callback<MongoDB>) => void

type Collection<T> : {
    find: (selector: Object, options?: Object) => Cursor<T>,
    findById: (id: String, options?: Object) => Continuable<T>,
    findAndModify: (selector: Object, sort?: Array, doc?: Object,
        options?: Object) => Continuable<T>,
    findAndRemove: (selector: Object, sort?: Array, options?: Object) =>
        Continuable<T>,
    findOne: (selector: Object, options?: Object) => Continuable<T>,
    insert: (docs: Array<T>, options?: Object) => Continuable<Array<T>>,
    mapReduce: (map: Function, reduce: Function, options?: Object) =>
        Continuable<Collection>,
    remove: (selector: Object, options?: Object) =>
        Continuable<Number>,
    update: (selector: Object, doc?: Object, options?: Object) =>
        Continuable<Number>
} & (Callback<MongoCollection>) => void

continuable-mongo/cursor : (Collection<T>) =>
    (selector: Object, options?: Object) => Cursor<T>

continuable-mongo/collection : (Client) =>
    (collectionName: String) => Collection

continuable-mongo : (uri: String, options?: Object) => Client
