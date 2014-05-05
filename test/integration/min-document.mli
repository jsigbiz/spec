type DOMText := {
    data: String,
    type: "DOMTextNode",
    length: Number,
    nodeType: 3,

    toString: (this: DOMText) => String,
    replaceChild: (
        this: DOMText,
        index: Number,
        length: Number,
        value: String
    ) => void
}

type DOMNode := DOMText | DOMElement | DocumentFragment
type DOMChild := DOMText | DOMElement
