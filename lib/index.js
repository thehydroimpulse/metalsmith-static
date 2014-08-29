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

module.exports = function(opts) {
  opts = opts || {};
  relSrc = opts.src || 'public';
  relDest = opts.dest || 'public';

  createDest = opts.createDest || false;

  return function(files, metalsmith, done) {
    var src = path.join(metalsmith.dir, relSrc);
    var dst = path.join(metalsmith.dir, metalsmith._dest, relDest);

    if (createDest) {
      var dir = path.dirname(dst);

      debug('creating: %s', dir);
      fsextra.mkdirp(dir);
    }

    ncp(src, dst, function(err) {
      if (err) return done(err);
      done();
    });
  };
};
