'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var metaMarkdown = require('./');

it('should compile Markdown to HTML', function (cb) {
	var stream = metaMarkdown();

	stream.once('data', function (file) {
		var fileContents = JSON.parse(file.contents);

		assert.equal(file.relative, 'fixture.html');
		assert.equal(fileContents.meta.title, 'lorem');
		assert.equal(fileContents.meta.image, 'https://unsplash.com/photos/HyZJQ1OqE8M');
	});

	stream.on('end', cb);

	stream.write(new gutil.File({
		path: 'fixture.md',
		contents: new Buffer(`---
title: lorem
image: https://unsplash.com/photos/HyZJQ1OqE8M
---
			### Heading`)
	}));

	stream.end();
});

it('should expose the marked object', function(){
	assert.ok(metaMarkdown.marked);
	assert.ok(metaMarkdown.marked.Renderer);
	assert.ok(metaMarkdown.marked.lexer);
	assert.ok(metaMarkdown.marked.parser);
})
