'use strict'

var marked = require('marked')
var yaml   = require('js-yaml')

var metaScope = /\[\]\(~([^]+)~\)/

var bfm = function(markdown) {

    if (typeof markdown != 'string') 
        throw new Error('markdown must be a string')

    // extract metadata string
    var metaStr = metaScope.exec(markdown)
    var meta = metaStr
               ? yaml.load(metaStr[1])   
               : {}
    
    markdown = markdown.replace(metaScope, '')
    
    // make sure marked is set to convert GFM
    marked.setOptions({
        gfm: true
    })
    
    var html = marked(markdown)
    
    return {
        html: html,
        meta: meta
    }
}
bfm.marked = marked

module.exports = bfm
