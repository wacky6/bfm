Blogging Friendly Markdown
===

# Install:
npm install wacky6/bfm

# Usage:
```JavaScript
var bfm  = require('bfm')
/* tweak makred module before conversion */
bfm.marked.setOptions({ /* options */ })

var result = bfm.bfm('# bfm')
console.log(result.html)
console.log(result.meta)
```

### bfm(markdown)
##### markdown
type: `string`
Markdown string to convert
##### return
on Success: 
```JavaScript
{
    html: html,   // String, converted html
    meta: meta    // Object, metadata in bfm
}
```
on Failure:  
`null`

### bfm.marked
type: `Object`
Underlying `marked` module, you tweak it before conversion.  
`gfm` options is always set to `true`



# BFM Syntax
Basically, **BFM** = [**GFM**](https://help.github.com/articles/github-flavored-markdown/) + **YAML MetaData**
#### MetaData format:
```Markdown
[](~
    /* valid yaml document here */
~)
```
MetaData is a YAML document, that can be parsed by `js-yaml`  



# Syntax Highlight
Syntax highlight is built-in, using `highlight.js`
Remember to include stylesheet in final document  
  Try one at [highlight.js](https://highlightjs.org/)
  CSS files can be found at [Github](https://github.com/isagalaev/highlight.js/tree/master/src/styles)


# HTML Tag Mixin
Mix tag attributes into markdown element
```Markdown
[](< title="Tooltip" data-some="data" style="color: red">)
A paragraph
```
renders to
```HTML
<p title="Tooltip" data-some="data" style="color: red">A paragraph</p>
```

# Note
list of possible future features can be found in [PLANNING.md](./PLANNING.md)

MIT License, See [./LICENSE](./LICENSE) for details
