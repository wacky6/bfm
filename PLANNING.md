Plan on future features
===

### Mixin HTML attributes, style  
Set HTML attribute, style of subsequent element
```Markdown
[](< 
    data-text='Text' 
    title='tooltip' 
    style='transform: translate(-50%, -50%)'
>)[link](href)
```
renders to
```HTML
<a href="href" data-text="Text" title="tooltip" style="transform: translate(-50%, -50%);">link</a>
```
### Clean output of `id` attribute