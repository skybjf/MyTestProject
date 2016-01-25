var util = require('gulp-util');
var jshint = require('gulp-jshint');
var through2 = require('through2');
var child_process = require('child_process');
var platform = require("os").platform();

module.exports = function() {
  var hint = jshint();
  // 创建一个对象流，它的 write 转发给 hint
  var source = through2.obj(function(obj, enc, cb) {
    hint.write(obj, cb);
  });
  // 执行 hint 记录错误
  var results = [];
  hint.pipe(jshint.reporter('jshint-stylish')).pipe(through2.obj(function(obj, enc, cb) {
    var hasError = false;
    if(!obj.jshint.success) {
      hasError = obj.jshint.results.some(function(result) { return result.error.code[0] === 'E'; });
      var path = obj.history[obj.history.length - 1].slice(obj.cwd.length);
      // 错误优先
      if(hasError) {
        results.unshift(path);
      } else {
        results.push(path);
      }
    }
    if(!hasError) source.push(obj);
    cb();
  }));
  // 如果存在错误则打印到控制台
  source.on('finish', function(e) {
    if(results.length) {
      if(platform === 'darwin') {
        child_process.exec('osascript -e \'display notification "' + results[0] + '" with title "MSITE Error"\'')
      }
      util.log('Finished', "'" + util.colors.cyan('jslint') + "'", util.colors.red('has error'));
    } else {
      util.log('Finished', "'" + util.colors.cyan('jslint') + "'", util.colors.green('without error'));
    }
  });
  return source;
};
