var sudo = require('sudo-prompt');
var cmdFnPath = require.resolve('cmd-fn');

var setName = sudo.setName;

var call = function(options, cb) {
  var cmd = process.execPath + ' ' + cmdFnPath;

  if (options.module) {
    cmd = cmd + ' --module ' + options.module;
  } else {
    return cb(new Error('module option is required'));
  }

  if (options.function) {
    cmd = cmd + ' --function ' + options.function;
  }
  if (options.params) {
    cmd = cmd + ' --params \'' + JSON.stringify(options.params) + '\'';
  }
  if (options.cwd) {
    cmd = cmd + ' --cwd \'' + options.cwd + '\'';
  }
  if (options.type) {
    cmd = cmd + ' --' + options.type;
  }

  return sudo.exec(cmd, function(err, val) {
    try {
      val = JSON.parse(val);
    } catch (e) {
      // Do Nothing
    }
    cb(err,val);
  });
};

module.exports = {
  call: call,
  setName: setName
};
