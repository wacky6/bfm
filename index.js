'use strict'

const meta     = require('./lib/meta')
const mixin    = require('./lib/mixin')
const bubbles  = require('./lib/bubbles')
const span     = require('./lib/span')
const pipes    = require('./lib/pipes')
const marked   = require('marked')
const hljs     = require('highlight.js')
const beautify = require('js-beautify').html

marked.setOptions({
    breaks:    true,
    gfm:       true,
    highlight: (code, lang) => hljs.highlightAuto(code, lang?[lang]:undefined).value
})

function flavorMarked(markdown) {
    if (typeof markdown != 'string')
        throw new Error('markdown must be a string')

    let res = {
        html:    null,
        meta:    {},
        bubbles: []
    }

    // pipe markdown through processors
    pipes(markdown, [
        meta.process,
        bubbles.process,
        span.process,        // span     => HTML <span>
        mixin.preserve,      // mixin    => HTML comments
        marked,              // markdown => HTML
        mixin.process,
        beautify,
        (html) => res.html=html    // pass output to res
    ], res)

    return res
}

module.exports         = (markdown) => flavorMarked(markdown).html
module.exports.marked  = marked
module.exports.process = flavorMarked
