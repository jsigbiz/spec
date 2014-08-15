type JsonMLSelector : String
type JsonMLTextContent : String
type JsonMLRawContent : {
    raw: String
}
type JsonMLFragment : {
    fragment: Array<JsonML>
}

type JsonMLAttributeKey : String
type JsonMLAttributeValue : String | Number | Boolean
type JsonMLAttrs : Object<JsonMLAttributeKey, JsonMLAttributeValue>

type MaybeJsonML :
    JsonMLTextContent |
    JsonMLRawContent |
    { fragment: Array<MaybeJsonML> } |
    [JsonMLSelector] |
    [JsonMLSelector, JsonMLRawContent] |
    [JsonMLSelector, { fragment: Array<MaybeJsonML> }] |
    [JsonMLSelector, Object] |
    [JsonMLSelector, JsonMLTextContent] |
    [JsonMLSelector, Array<MaybeJsonML>] |
    [JsonMLSelector, JsonMLAttrs, Array<MaybeJsonML>] |
    [JsonMLSelector, JsonMLAttrs, JsonMLTextContent] |
    [JsonMLSelector, JsonMLAttrs, { fragment: Array<MaybeJsonML> }] |
    [JsonMLSelector, JsonMLAttrs, JsonMLRawContent]

type JsonML :
    JsonMLTextContent |
    JsonMLFragment |
    JsonMLRawContent |
    [
        JsonMLSelector,
        JsonMLAttrs,
        Array<JsonML>
    ]

jsonml-stringify : (jsonml: JsonML, opts?: Object) => String

jsonml-stringify/normalize : (MaybeJsonML) => JsonML

jsonml-stringify/dom : (jsonml: JsonML) => DOMElement

jsonml-stringify/attrs : (attributes: Object) => String

jsonml-stringify/unpack-selector :
    (selector: String, attributes: Object) => tagName: String
