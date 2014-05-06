import { Observ } from "observ"
import { Delegator } from "dom-delegator"

type KeyCode := Number
type Direction = "left" | "right" | "up" | "down" | "void"
type Coord := {
    x: Number,
    y: Number,
    lastPressed: Direction
}
