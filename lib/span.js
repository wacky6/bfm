'use strict'

const re_span = /\[([^\n\r]+?)\]\(<([^]+?)>\)/g

function expandSpan(md) {
    return md.replace(re_span, "[](<$2>)<span>$1</span>")
}

module.exports = {
    process: expandSpan
}
