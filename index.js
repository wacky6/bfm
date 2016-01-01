'use strict'

let meta      = require('./lib/meta')
let mixin     = require('./lib/mixin')
let bubbles   = require('./lib/bubbles')
let span      = require('./lib/span')
let marked    = require('marked')
let hljs      = require('highlight.js')
let beautify  = require('js-beautify').html

marked.setOptions({
    gfm: true,
    highlight: (code, lang) => hljs.highlightAuto(code, lang?[lang]:undefined).value
})

function bfm(markdown) {
    if (typeof markdown != 'string')
        throw new Error('markdown must be a string')

    marked.setOptions({gfm: true})

    let html, res={}
    // meta
    res.meta = meta.parse(markdown)
    markdown = meta.remove(markdown)

    // prepare for marked conversion
    markdown = span.process(markdown)
    markdown = mixin.preserve(markdown)

    // convert to HTML then mixin
    html = marked(markdown)
    html = mixin.process(html)

    // extract bubbles
    res.bubbles = bubbles.parse(html)
    html = bubbles.remove(html)

    res.html = beautify(html, { indent_size: 2 })

    return res
}

module.exports = bfm
module.exports.marked = marked
