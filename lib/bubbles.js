'use strict'

let re_bubbles = [
    /(<style[^]+?<\/style>)/g,
    /(<link[^]+?<\/link>)/g
]

function extractBubbles(html) {
    let m, arr=[]
    re_bubbles.forEach( re=>{
        while ( (m=re.exec(html)) )
            arr.push(m[1])
    })
    return arr
}

function removeBubbles(html) {
    re_bubbles.forEach( re=>{
        html = html.replace(re, '')
    })
    return html
}

module.exports = {
    parse:   extractBubbles,
    remove:  removeBubbles
}
