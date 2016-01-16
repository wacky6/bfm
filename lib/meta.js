'use strict'

const yamlLoad = require('js-yaml').load
const re_meta  = /\[\]\(~([^]+?)~\)/

function extractMeta(markdown) {
    return markdown.replace(re_meta, (str, meta)=>{
        if (meta.indexOf('\t')!==-1)
            throw new Error('Tab not allowed in meta')
        this.meta = yamlLoad(meta)
        return ''
    })
}

module.exports = {
    process: extractMeta
}
