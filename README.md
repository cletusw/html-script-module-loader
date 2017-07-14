# html-script-module-loader

Webpack loader to transform [&lt;script type="module">](https://jakearchibald.com/2017/es-modules-in-browsers/) to require statements.


## Install

```
npm install html-script-module-loader
```

You'll also need another loader (like [raw-loader](https://github.com/webpack-contrib/raw-loader) or [html-loader](https://github.com/webpack-contrib/html-loader)) to actually load the HTML files.


## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/)


### template.html

``` html
<script type="module" src="./nested.js"></script>
<h1>This is the template</h1>
```


### nested.js

``` javascript
console.log('loaded nested.js');
```


### example.js

``` javascript
// Loader order is important. html-script-module-loader operates on JavaScript,
// so it must run *after* (further *left* in the loader string) raw-loader or html-loader.
var template = require('html-script-module-loader!raw-loader!./template.html');
// => "loaded nested.js"
console.log(template);
// => "<h1>This is the template</h1>"
```


## License

MIT
