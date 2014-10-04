/**
 * Module Dependencies.
 */

var debug = require('debug')('metalsmith-static');
var ncp   = require('ncp').ncp;
var path  = require('path');
var fsextra    = require('fs-extra');


/**
 * Module Exports
 */

module.exports = function(assets) {
  assets = assets || [{}];
  assets = !Array.isArray(assets) ? [ assets ] : assets;

  return function(files, metalsmith, done) {
    assets.forEach(function(opts) {
      var relSrc = opts.src || 'public';
      var relDest = opts.dest || 'public';
      var createDest = opts.createDest || true;

      var src = path.join(metalsmith.directory(), relSrc);
      var dst = path.join(metalsmith.destination(), relDest);

      if (createDest) {
        var dir = path.dirname(dst);

        debug('creating: %s', dir);
        fsextra.mkdirpSync(dir);
      }

      ncp(src, dst, function(err) {
        if (err) return done(err);
      });
    });

    done();
  };
};
