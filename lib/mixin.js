'use strict'

let assert = require('assert')
let re_mixin = /\[\]\(<([^]+?)>\)/g
let re_html_mixin = /(?: \x04)?<!--([^\x01]+?)\x01-->\s*?(<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*))(\/>|>)/g
let re_mixin_split = /\s+(?=\.[-_A-Za-z])|\s+(?=[#@$^])/g
let re_id_attr = /id=("|')[^"']+?\1/
let re_code_block = /^```([^]+?)[\n\r]+?```/gm
let re_code_inline = /`([^\n\r`]+?)`/g
let re_preserved_code = /<!--Code(Block|Inline)\x02 (\d+)-->/g

function preserveMixin(md) {
    // preserve code blocks, inline code
    // mixin inside these elements should not be translated
    let codeBlock = []
    let codeInline = []
    md = md.replace(re_code_block, (str, capture) => {
        codeBlock.push(capture)
        return str.replace(capture, '<!--CodeBlock\x02 '+(codeBlock.length-1)+'-->')
    }).replace(re_code_inline, (str, capture) => {
        codeInline.push(capture)
        return str.replace(capture, '<!--CodeInline\x02 '+(codeInline.length-1)+'-->')
    })

    // use \x01 to prevent block & inline mixins from sticking together
    // RegExp does seems to behave un-greedy properly??
    // normalize minxin syntax
    md = md.replace(re_mixin, (str, mixin) => `<!-- ${mixin.replace(/[\n\r\s]+/g, '  ')} \x01-->` )

    /* insert \x04 so `marked` correctly translates block element
     * other characters should work too
     * eg:
     *    [](< .block >)
     *    [](< .inline >)**strong** paragraph
     *
     * without &nbsp; it get translated into `<strong>strong</strong> paragraph`
     * correct translation: `<p><strong>strong</strong> paragraph</p>`
     */
    md = md.replace(/-->([\w\n\r]*?)<!--/g, '-->$1 \x04<!--')

    // restore code blocks
    md = md.replace(re_preserved_code, (str, typeMark, number) => {
        if (typeMark === 'Block')
            return codeBlock[parseInt(number)]
        if (typeMark === 'Inline')
            return codeInline[parseInt(number)]
        assert(false, 'Invalid code typeMark: '+typeMark+", expect 'Block' or 'Inline'")
    })
    return md
}

function htmlAttr(key, val) {
    return `${key}="${val}"`
}

function processMixin(html) {
    let m;
    let newHtml = ''+html
    while ((m=re_html_mixin.exec(html))) {
        let full     = m[0]
        let tagOpen  = m[2]  // <tag attrs=...
        let tagClose = m[3]  // /> or >
        let mixins   = m[1].trim().split(re_mixin_split)

        let idVal   = null
        let styles  = []    // style="..."
        let classes = []    // class="..."
        let appends = []    // data-*, as-is

        mixins.forEach( decl => {
            let content = decl.substring(1)
            switch(decl[0]) {
            case '#':   // id
                // replace id in tagOpen, marked generates it for h1-h6
                tagOpen = tagOpen.replace(re_id_attr, '')
                idVal = content
            break
            case '.':
                classes.push(content)
            break
            case '@':
                styles.push(content)
            break
            case '$', '^':  // fall through
            default:
                let kv = content.split(':')
                let key = (decl[0]==='$'?'data-':'') + kv[0].trim()
                let val = (kv.length==1 ? kv[0] : kv[1]).trim()
                appends.push(htmlAttr(key, val))
            break
            }
        })

        if (styles.length)
            appends.unshift(htmlAttr('style', styles.join('; ')+';'))
        if (classes.length)
            appends.unshift(htmlAttr('class', classes.join(' ')))
        if (idVal)
            appends.unshift(htmlAttr('id', idVal))

        newHtml = newHtml.replace(full, `${tagOpen} ${appends.join(' ')} ${tagClose}`)
    }

    return newHtml
}

module.exports = {
    preserve: preserveMixin,
    process:  processMixin
}
