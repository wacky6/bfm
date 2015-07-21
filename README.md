Blogging Friendly Markdown
===

# Install:


# Usage:
```JavaScript
var bfm  = require('bfm')
/* You tweak underlying makred module before conversion */
bfm.marked.setOptions({ /* options */ })

var result = bfm.bfm('# bfm')
console.log(result.html)
console.log(result.meta)
```

### bfm(markdown)
##### markdown
type: `string`
String to be converted
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
```
[](~
    /* valid yaml document here */
~)
```
MetaData is a YAML document, that can be parsed by `js-yaml`  

if BFM is parsed by other markdown processor, `[](~ ~)` generally translates to an empty `<a>`


# Note
list of possible future features can be found in [PLANNING.md](./PLANNING.md)


MIT License,
