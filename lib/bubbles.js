'use strict'

const re_bubbles = /<(link|style)[^]+?<\/\1>/g

function extractBubbles(markdown) {
    return markdown.replace(re_bubbles, (str)=>{
        this.bubbles.push(str)
        return ''
    })
}

module.exports = {
    process: extractBubbles
}
