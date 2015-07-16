#! /usr/bin/env node

/**
 * This test needs to be run manually because you need to authenticate before
 * it can run.
 * Run with `$ node test.js` or `$ npm test`
 */

 var runningAsScript = !module.parent;

if (runningAsScript) {
  var sudoFn = require('./index');

  sudoFn.setName('sudoFn');

  sudoFn.call({
    module: __dirname + '/test',
    function: 'foo',
    params: [{'bar': 'baz'}],
    type: 'node-callback'
  }, function(err, val) {
    if (err) {
      console.error(err);
    } else {
      if (val.bar === 'baz') {
        console.log('✔ Test 1 passed ✔');
      } else {
        console.error('✖ Test 1 failed ✖');
        console.error('\''+ val.bar + '\' should be \'baz\'');
      }
    }
  });

  sudoFn.call({
    module: __dirname + '/test',
    function: 'foo',
    params: [{'bar': 'baz'}, 'bin'],
  }, function(err, val) {
    if (err) {
      console.error(err);
    } else {
      if (val.bob === 'bin') {
        console.log('✔ Test 2 passed ✔');
      } else {
        console.error('✖ Test 2 failed ✖');
        console.error('\''+ val.bob + '\' should be \'bin\'');
      }
    }
  });

} else {
  module.exports = {
    foo: function(params, cb) {
      var returnObj = {
        bar: params.bar,
        bob: cb || null
      };
      if (typeof cb === 'function') {
        cb(null, returnObj);
      } else {
        return returnObj;
      }

    }
  };
}
