Blogging Friendly Markdown
===
a Wacky but Flavorful Markdown

This project is subject to changes that **BREAKS COMPATIBILITY**  
For production, use with **EXTREME CAUTION**

## Install:
`npm install wacky6/bfm`


## Usage:
```JavaScript
var bfm  = require('bfm')
/* tweak  before conversion */
bfm.marked.setOptions({ /* options */ })

var result = bfm.bfm('# bfm')
result.html   // output html
result.meta   // metadata
result.bubble // Array of elements should move to <head>
```

#### bfm(markdown)
##### markdown: `string`

returns following Object:

```JavaScript
{
    html:    html,    // string, converted html
    meta:    meta,    // Object, metadata in bfm
    bubbles: ['<style></style>']  // Array, bubbles
}
```
`throw` if something bad happened


#### bfm.marked
Underlying `marked` module, tweak it before conversion.  
`gfm` is always set to `true`



## BFM Syntax
BFM = [GFM](https://help.github.com/articles/github-flavored-markdown/) + YAML(Meta) + Sugar + Mixin

#### Meta: a valid YAML document
tab (`\t`) is NOT allowed

```
[](~
    /* valid yaml document, except `tab` */
~)
```


#### `<span>` Tag Sugar
`[text](<@color:red>)`  => <span style="color:red;">red text</span>



#### Mixin:
```
[](<
   .package                // -> class="package"
   #BFM                    // -> id="bfm"
   @color: red             // -> style="color:red;"
   @transition: color 1s   // -> style="transiton:color 1s; -webkit-transition: color 1s;"
   $text: 'bfm'            // -> data-text="bfm"
   ^as-is: as-is           // -> as-is="as-is"
>)**BFM**
```
Internally, recognizes mixins using `\s+(?=[.#@$^])` (space followed by special chars)
don't write `.1s` in style mixin, write `0.1s`, or bad thing happens

Three mixin styles are encouraged, choose whichever comforts your eyes:

* Compact (single space) : `[](< .class #id @color:red >)`
* Relaxed (triple spaces): `[](< .class   #id   @color: red >)`
* Object (Multiline): as shown above


#### Bubble
You can embed `<style>`, `<link>` in markdown, they will present in `bubbles` Array. Intended for further blog rendering.



## Syntax Highlight
Syntax highlight is built-in, using `highlight.js`  
Remember to include stylesheet in final document  
Try one at [highlight.js](https://highlightjs.org/), [Source](https://github.com/isagalaev/highlight.js/tree/master/src/styles)



## Note
MIT License, See [LICENSE](./LICENSE) for details
