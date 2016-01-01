'use strict'

var bfm  = require('./index')
var fs   = require('fs')
var basename = require('path').basename
var extname  = require('path').extname

var ls  = fs.readdirSync('./test')

ls.filter(function(f){
    return extname(f)=='.md'
}).forEach(function(f){
    var _ = bfm(fs.readFileSync('test/'+f, 'utf-8'))
    var meta = _.meta
    var html = _.html
    fs.writeFileSync('test/'+f+'.html',
        `
        <!DOCTYPE html>
        <html>
        <body>
        <h4>Meta:</h4>
        <pre>${JSON.stringify(meta, null, '  ')}</pre>
        <h4>HTML:</h4>
        <article>
            ${html}
        </article>
        <h4>HTML Code:</h4>
        <xmp>${html}</xmp>
        </body>
        </html>
        `
     )
})
