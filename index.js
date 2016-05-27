var sudo = require('sudo-prompt');
var cmdFnPath = require.resolve('cmd-fn');

var setName = sudo.setName;

var call = function(options, cb) {
  // Put paths inside quotes so spaces don't need to be escaped
  var cmd = '"' + process.execPath +'" "' + cmdFnPath + '"';

  if (process.execPath.indexOf("Helper.app/Contents/MacOS") >= 0) {
    // If we're running in Electron then make sure that the process is being
    // run in node mode not as the GUI app.
    cmd = 'ELECTRON_RUN_AS_NODE=1 ' + cmd;
  }

  if (options.module) {
    cmd = cmd + ' --module ' + options.module;
  } else {
    return cb(new Error('module option is required'));
  }

  if (options.function) {
    cmd = cmd + ' --function ' + options.function;
  }
  if (options.params) {
    var params = Array.isArray(options.params) ? options.params : [options.params];
    cmd = cmd + ' --params \'' + JSON.stringify(params) + '\'';
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
