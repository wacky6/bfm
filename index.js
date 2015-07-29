'use strict'

var marked   = require('marked')
var yaml     = require('js-yaml')
var hljs     = require('highlight.js')
var beautify = require('js-beautify').html

var re_meta = /\[\]\(~([^]+)~\)/
var re_mixin = /\[\]\(<([^]+?)>\)/g
var re_mixinHtml = /<!--([^]+?)-->\s*?(<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*))(\/>|>)/g

function preserveMixin(markdown) {
    return markdown.replace(re_mixin, '<!-- $1 -->\n')
}

function mixin(html) {
    return html.replace(re_mixinHtml, '$2 $1 $3')
}

var bfm = function(markdown) {

    if (typeof markdown != 'string') 
        throw new Error('markdown must be a string')

    // extract metadata string
    var metaStr = re_meta.exec(markdown)
    
    // parse metadata, if yaml.load throws, return null, indicating a failure
    var meta
    try {
        meta = metaStr
               ? yaml.load(metaStr[1]) 
               : {}
    }catch(e) {
        return null
    }
    
    markdown = markdown.replace(re_meta, '')
    
    // preserve mixins
    markdown = preserveMixin(markdown)
    
    // make sure marked is set to convert GFM
    marked.setOptions({
        gfm: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value
        }
    })
    
    var html = marked(markdown)
    
    html = mixin(html) 
    
    html = beautify(html, {
        indent_size: 2
    })
    
    return {
        html: html,
        meta: meta
    }
}
bfm.marked = marked

module.exports = bfm
