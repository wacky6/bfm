'use strict'

let re_mixin = /\[\]\(<([^]+?)>\)/g
let re_preserve_replace = '<!-- $1 \x01-->'
let re_html_mixin = /(?:#)?<!--([^\x01]+?)\x01-->\s*?(<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*))(\/>|>)/g
let re_mixin_split = /\s+(?=[.#@$^])/g
let re_id_attr = /id=("|')[^"']+?\1/

function preserveMixin(md) {
    // use \x01 to prevent block & inline mixins from sticking together
    // RegExp does seems to behave un-greedy properly??
    md = md.replace(re_mixin, '<!-- $1 \x01-->')

    /* insert # so `marked` correctly translates block element
     * other characters should work too
     * eg:
     *    [](< .block >)
     *    [](< .inline >)**strong** paragraph
     *
     * without &nbsp; it get translated into <strong>strong</strong> paragraph
     * correct translation: <p><strong>strong</strong> paragraph</p>
     */
    md = md.replace(/-->([\w\n\r]*?)<!--/g, '-->$1 #<!--')
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
