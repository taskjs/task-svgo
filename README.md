# task-svgo
> Minify SVG files with svgo.

## The "svgo" task

### Usage Examples

```js
var svgo = new (require('task-svgo'))
svgo.run(inputs, options, logger)
```

### Options

#### options.plugins

Type: `array`

To disable/enable plugins, look for the plugin name at the [SVGO repository](https://github.com/svg/svgo/tree/master/plugins) and copy the plugin name (minus the file extension).
Then set its value in the JSON to `false` in comma-separated objects.
To exemplify, here is how the plugins section in the example configuration (illustrated above) might be written with some of the standard SVGO plugins disabled:

```js
[
	{ removeViewBox: false }, 				// don't remove the viewbox atribute from the SVG
	{ removeUselessStrokeAndFill: false },	// don't remove Useless Strokes and Fills
	{ removeEmptyAttrs: false }				// don't remove Empty Attributes from the SVG
]
```

## Release History
* 2014-07-13 0.1.0 Initial release.

## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.
