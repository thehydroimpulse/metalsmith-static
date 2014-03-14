/**
 * Module Dependencies.
 */

var ncp   = require('ncp').ncp;
var path  = require('path');


/**
 * Module Exports
 */

module.exports = function(opts) {
  opts = opts || {}
  relSrc = opts.src || 'public'
  relDest = opts.dest || 'public'

  return function(files, metalsmith, done) {
    var src = path.join(metalsmith.dir, relSrc);
    ncp(src, path.join(metalsmith.dir, metalsmith._dest, relDest), function(err) {
      if (err) return done(err);
      done();
    });
  };
};
