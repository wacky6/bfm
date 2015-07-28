'use strict'

var marked = require('marked')
var yaml   = require('js-yaml')
var hljs   = require('highlight.js')

var mixinScope = /\[\]\(<([^]+)>\)/g

function preserveMixin(markdown) {
    return markdown.replace(mixinScope, '<!--BFM-MIXIN-- $1 -->')
}

var metaScope = /\[\]\(~([^]+)~\)/

var bfm = function(markdown) {

    if (typeof markdown != 'string') 
        throw new Error('markdown must be a string')

    // extract metadata string
    var metaStr = metaScope.exec(markdown)
    
    // parse metadata, if yaml.load throws, return null, indicating a failure
    var meta
    try {
        meta = metaStr
               ? yaml.load(metaStr[1]) 
               : {}
    }catch(e) {
        return null
    }
    
    markdown = markdown.replace(metaScope, '')
    
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
    
    return {
        html: html,
        meta: meta
    }
}
bfm.marked = marked

module.exports = bfm
