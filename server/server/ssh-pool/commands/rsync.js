"use strict";

exports.__esModule = true;
exports.isRsyncSupported = isRsyncSupported;
exports.formatRsyncCommand = formatRsyncCommand;

var _which = _interopRequireDefault(require("which"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function isRsyncSupported() {
  return _isRsyncSupported.apply(this, arguments);
}

function _isRsyncSupported() {
  _isRsyncSupported = _asyncToGenerator(function* () {
    return new Promise(resolve => (0, _which.default)('rsync', err => resolve(!err)));
  });
  return _isRsyncSupported.apply(this, arguments);
}

function formatExcludes(excludes) {
  return excludes.reduce((args, current) => [...args, '--exclude', `"${current}"`], []);
}

function formatRsyncCommand({
  src,
  dest,
  excludes,
  additionalArgs,
  remoteShell
}) {
  (0, _util.requireArgs)(['src', 'dest'], {
    src,
    dest
  }, 'rsync');
  let args = ['rsync', '--archive', '--compress'];
  if (additionalArgs) args = [...args, ...additionalArgs];
  if (excludes) args = [...args, ...formatExcludes(excludes)];
  if (remoteShell) args = [...args, '--rsh', (0, _util.wrapCommand)(remoteShell)];
  args = [...args, src, dest];
  return (0, _util.joinCommandArgs)(args);
}