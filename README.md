Flavor Marked
===
wacky but Flavorful Markdown

## Install:
`npm install flavor-marked`


## Usage:
```JavaScript
const flavorMarked = require('flavor-marked')
flavorMarked.marked.setOptions({ /* options */ })    // tweak before conversion

flavorMarked('# Markdown')            // => string, html
flavorMarked.process('# Markdown')    // => object, {meta, bubbles, html}

```

### flavorMarked(markdown)
##### markdown
Type: `string`
Markdown string to be compiled
##### return:
Type: 'string'
Compiled html

throws `Error` if something bad happens


### flavorMarked.process(markdown)
##### markdown
Type: `string`
Markdown string to be compiled
##### return:
Type: 'object', contains three fields:
* html: `string`, compiled html
* meta: `object`, embedded meta-data
* bubbles: `Array`, bubbles that should be put in <head>

throws `Error` if something bad happens

### flavorMarked.marked
Underlying `marked` module, you can tweak it before conversion




## flavor-marked Syntax
Flavorful Markdown = GFM + Meta-data + Mixin/Sugar + Bubbles

#### GFM
See [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)

#### Meta-data: valid YAML document
tab(`\t`) is not allowed
```
[](~
    author: wacky6,
    date:   2016-01-01
    ...
~)
```

#### Mixin/Sugar
##### `<span>` Tag sugar
`[text](<@color:red>)`  => `<span style="color:red;">red text</span>`

##### Mixin
Mix html attributes into converted markdown, you can use mixins for both block and inline tags.
```
[](<
   .package                // -> class="package"
   #flavor-markdown        // -> id="flavor-markdown"
   @opacity: .1            // -> style="opacity: .1;"
   $text: 'flavors'        // -> data-text="flavors"
   ^as-is: as-is           // -> as-is="as-is"
>)Too many flavors!
```

Internally, recognizes mixins using `/\s+(?=\.[-_A-Za-z])|\s+(?=[#@$^])/g` (space followed by special chars)  
Numeric expression like `.1s` is properly handled. 

Three mixin styles are encouraged, choose whichever comforts your eyes:
```
/* Compact, single space, no space in attr */
[](< .class #id @color:red >)

/* Relaxed, triple spaces, space in attr */
[](< .class   #id   @color: red >)

/* Object, multiple lines, as shown above */
```


#### Bubble
When embedding `<style>`, `<link>` in markdown, they will presend in `bubbles` Array.  
Intended for further processing.



## Syntax Highlight
[highlight.js](https://highlightjs.org/) is built-in
Remember to include their stylesheet: [highlight.js stylesheets](https://github.com/isagalaev/highlight.js/tree/master/src/styles)


## How it works
flavor-marked is NOT written as a formal parser. It simply uses `RegExp`s to transform texts. So, in theory, there should be some edge-cases when flavor-marked produces incorrect documents. If you encountered one in practise, please open an issue.

Internally, converts mixins to HTML comments `<!-- -->`, they are preserved by `marked` during conversion. After conversion, transform these comments to the following html tag's attributes.

If you have any cool ideas about mixins, feel free to implement and PR them.



## Note
MIT License, See [LICENSE](./LICENSE) for details
