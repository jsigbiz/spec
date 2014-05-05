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

type DOMElement := {
    tagName: String,
    className: String,
    dataset: Object<String, Any>,
    childNodes: Array<DOMChild>,
    parentNode: null | DOMElement,
    style: Object<String, String>,
    type: "DOMElement",
    nodeType: 1,
    ownerDocument: null | Document,
    namespaceURI: null | String,

    appendChild: (this: DOMElement, child: DOMChild) => DOMChild,
    replaceChild:(
        this: DOMElement,
        elem: DOMChild,
        needle: DOMChild
    ) => DOMChild,
    removeChild: (this: DOMElement, child: DOMChild) => DOMChild,
    insertBefore: (
        this: DOMElement,
        elem: DOMChild,
        needle: DOMChild | null | undefined
    ) => DOMChild,
    addEventListener: addEventListener,
    dispatchEvent: dispatchEvent,
    focus: (this: DOMElement) => void,
    toString: (this: DOMElement) => String
}

type DocumentFragment := {
    childNodes: Array<DOMChild>,
    parentNode: null | DOMElement,
    type: "DocumentFragment",
    nodeType: 11,
    nodeName: "#document-fragment",
    ownerDocument: Document | null,

    appendChild: (this: DocumentFragment, child: DOMChild) => DOMChild,
    replaceChild: (
        this: DocumentFragment,
        elem: DOMChild,
        needle: DOMChild
    ) => DOMChild,
    removeChild: (this: DocumentFragment, child: DOMChild) => DOMChild,
    toString: (this: DocumentFragment) => String
}
