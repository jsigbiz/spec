type DOMText : {
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

type DOMNode : DOMText | DOMElement | DocumentFragment
type DOMChild : DOMText | DOMElement

type DOMElement : {
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

type DocumentFragment : {
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

type Document : {
    body: DOMElement,
    documentElement: DOMElement,

    createTextNode: (this: Document, value: String) => DOMText,
    createElement: (this: Document, tagName: String) => DOMElement,
    createElementNS: (
        this: Document,
        namespace: String | null,
        tagName: String
    ) => DOMElement,
    createDocumentFragment: (this: Document) => DocumentFragment,
    createEvent: (this: Document) => Event,
    getElementById: (
        this: Document,
        id: String,
        parent?: DOMElement
    ) => null | DOMElement
}

type Event : {
    type: String,
    bubbles: Boolean,
    cancelable: Boolean,

    initEvent: (
        this: Event,
        type: String,
        bubbles: Boolean,
        cancelable: Boolean
    ) => void
}

type addEventListener : (
    this: DOMElement,
    type: String,
    listener: Listener
) => void

type dispatchEvent : (
    this: DOMElement,
    ev: Event
) => void

min-document/event/add-event-listener : addEventListener

min-document/event/dispatch-event : dispatchEvent

min-document/document : () => Document

min-document/dom-element : (
    tagName: String,
    owner?: Document,
    namespace?: String | null
) => DOMElement

min-document/dom-fragment :
    (owner?: Document) => DocumentFragment

min-document/dom-text :
    (value: String, owner?: Document) => DOMText

min-document/event : () => Event

min-document/serialize : (DOMElement) => String

min-document : Document
