'use strict'

let yamlLoad = require('js-yaml').load
let re_meta  = /\[\]\(~([^]+?)~\)/

function extractMeta(md) {
    let metaStr = re_meta.exec(md)
    // check \t, throws if found one
    if (metaStr && metaStr[1].indexOf('\t')!==-1) {
        throw new Error('Tab not allowed in BFM meta data')
    }
    return metaStr ? yamlLoad(metaStr[1]) : {};
}

function removeMeta(md) {
    return md.replace(re_meta, '')
}

module.exports = {
    parse:  extractMeta,
    remove: removeMeta
}
