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
