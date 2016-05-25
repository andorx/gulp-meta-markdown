'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var marked = require('marked');

module.exports = function (options) {
	return through.obj(function (file, enc, callback) {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		if (file.isStream()) {
			callback(new gutil.PluginError('gulp-meta-markdown', 'Streaming not supported'));
			return;
		}

		return explodeContent(file.contents.toString(), function(err, result) {
			if (err) {
				callback(new gutil.PluginError('gulp-meta-markdown', err, { fileName: file.path }));
				return;
			}

			file.contents = new Buffer(JSON.stringify(result));
			file.path = gutil.replaceExtension(file.path, '.html');

			callback(null, file);
		});
	});

	function explodeContent(content, callback) {
		var pattern = /\n-{3}/g,
				metadata = pattern.exec(content);

		if (content.slice(0, 3) !== '---' || !metadata) {
			marked(content, options, function(err, data) {
				callback(err, {
					html: data
				});
			});
			return;
		}

		marked(content.slice(pattern.lastIndex), options, function(err, data) {
			callback(err, {
				meta: parseMetadata(content.slice(4, metadata.index)),
				html: data
			});
		});
	}

	function parseMetadata(metadata) {
		var result = {};

		metadata.split('\n').forEach(function(pair) {
			var keyValuePair = pair.split(/:[^\/]/);

			if (keyValuePair[0] && keyValuePair[1]) {
				result[keyValuePair[0]] = keyValuePair[1].trim();
			}
		});

		return result;
	}
};

module.exports.marked = marked;
