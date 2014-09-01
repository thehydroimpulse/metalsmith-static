var Metalsmith = require('metalsmith');
var assert = require('assert');
var equal = require('assert-dir-equal');
var asset = require('..');
var fs = require('fs-extra');

describe('test', function() {
  it('should copy file', function(done) {
    var metalsmith = Metalsmith('test/fixtures/one');

    fs.removeSync('test/fixtures/one/build/*');

    metalsmith
      .clean(false)
      .use(asset())
      .build(function(err) {
        if (err) return done(err);

        equal('test/fixtures/one/expected', 'test/fixtures/one/build');

        done();
      });
  });

  it('should be able to be called multiple times', function(done) {
    var metalsmith = Metalsmith('test/fixtures/two');

    fs.removeSync('test/fixtures/two/build/*');

    metalsmith
      .clean(false)
      .use(asset({
        "src": "public/styles.css",
        "dest": "styles.css",
      }))
      .use(asset({
        "src": "public/script.js",
        "dest": "script.js",
      }))
      .build(function(err) {
        if (err) return done(err);

        equal('test/fixtures/two/expected', 'test/fixtures/two/build');

        done();
      });
  });

  it('should create destination directory recursively', function(done) {
    var metalsmith = Metalsmith('test/fixtures/recurse');

    fs.removeSync('test/fixtures/recurse/build/');

    metalsmith
      .clean(false)
      .use(asset({
        "src": "assets/media/css/styles.css",
        "dest": "css/style.css",
        "createDest": true
      }))
      .build(function(err) {
        if (err) return done(err);

        equal('test/fixtures/recurse/expected', 'test/fixtures/recurse/build');

        done();
      });
  });
});

