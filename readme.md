# gulp-meta-marked [![Build Status](https://travis-ci.org/andorx/gulp-meta-marked.svg?branch=master)](https://travis-ci.org/andorx/gulp-meta-marked)

> Markdown to HTML with [marked](https://github.com/chjj/marked)

*Issues with the output should be reported on the marked [issue tracker](https://github.com/chjj/marked/issues).*


## Install

```
$ npm install --save-dev gulp-meta-marked
```


## Usage

```intro.md
---
title: Lorem ipsum dolor sit amet
---
# Heading
```

```js
var gulp = require('gulp');
var metaMarkdown = require('gulp-meta-marked');

gulp.task('default', function () {
	return gulp.src('intro.md')
		.pipe(metaMarkdown())
		.pipe(data(function(file) {
			var fileContents = JSON.parse(file.contents);

			// fileContents.meta
			// fileContents.html
		}));
});
```


## API

### markdown(options)

See the marked [options](https://github.com/chjj/marked#options-1).

### markdown.marked

Access the `marked` object to customize the [lexer](https://github.com/chjj/marked#access-to-lexer-and-parser), [parser](https://github.com/chjj/marked#access-to-lexer-and-parser) or [renderer](https://github.com/chjj/marked#renderer).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
