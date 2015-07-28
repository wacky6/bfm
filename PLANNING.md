Plan on future features
===

### Mixin HTML attributes, style  
Set HTML attribute, style of subsequent element
```Markdown
[]($data-text='Text' $title='tooltip')[link](href)
[](@color:red)**Red Text**
```
renders to
```HTML
<a href="href" data-text="Text" title="tooltip">link</a>
<strong style="color: red;">Red Text</strong>
```
### Clean output of `id` attribute