'use strict'

const flavorMarked  = require('./index')
const fs            = require('fs')
const basename      = require('path').basename
const extname       = require('path').extname

let ls  = fs.readdirSync('./test')

ls.filter( 
    (f) => extname(f)=='.md'
).forEach( (f) => {
    let _ = flavorMarked.process(fs.readFileSync('test/'+f, 'utf-8'))
    let meta = _.meta
    let html = _.html
    let bubbles = _.bubbles
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
        <h4>Bubbles:</h4>
        <xmp>${bubbles.join('\n\r')}</xmp>
        </body>
        </html>
        `
     )
})
