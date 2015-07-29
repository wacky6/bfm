Blogging Friendly Markdown
===

# Install:
`npm install wacky6/bfm`

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
Basically, **BFM** = [**GFM**](https://help.github.com/articles/github-flavored-markdown/) + **YAML MetaData** + **Tag Mixin**

#### MetaData: a valid YAML document
```Markdown
[](~
    /* valid yaml document here */
~)
```

#### Tag Mixin: 
```Markdown
[](< title="Tooltip" data-some="data" style="color: red">)
A paragraph
```
renders to
```HTML
<p title="Tooltip" data-some="data" style="color: red">A paragraph</p>
```



# Syntax Highlight
Syntax highlight is built-in, using `highlight.js`
Remember to include stylesheet in final document  
Try one at [highlight.js](https://highlightjs.org/), [Source](https://github.com/isagalaev/highlight.js/tree/master/src/styles)



# Note
list of possible future features can be found in [PLANNING.md](./PLANNING.md)

MIT License, See [LICENSE](./LICENSE) for details
