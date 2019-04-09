"use strict";

exports.__esModule = true;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _streamLineWrapper = _interopRequireDefault(require("stream-line-wrapper"));

var _tmp = require("tmp");

var _rsync = require("./commands/rsync");

var _ssh = require("./commands/ssh");

var _tar = require("./commands/tar");

var _cd = require("./commands/cd");

var _mkdir = require("./commands/mkdir");

var _scp = require("./commands/scp");

var _raw = require("./commands/raw");

var _rm = require("./commands/rm");

var _util = require("./commands/util");

var _remote = require("./remote");

var _util2 = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const tmpName =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (options) {
    return new Promise((resolve, reject) => (0, _tmp.tmpName)(options, (err, name) => {
      if (err) reject(err);else resolve(name);
    }));
  });

  return function tmpName(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * An ExecResult returned when a command is executed with success.
 * @typedef {object} ExecResult
 * @property {Buffer} stdout
 * @property {Buffer} stderr
 * @property {ChildProcess} child
 */

/**
 * An ExecResult returned when a command is executed with success.
 * @typedef {object} MultipleExecResult
 * @property {Buffer} stdout
 * @property {Buffer} stderr
 * @property {ChildProcess[]} children
 */

/**
 * An ExecError returned when a command is executed with an error.
 * @typedef {Error} ExecError
 * @property {Buffer} stdout
 * @property {Buffer} stderr
 * @property {ChildProcess} child
 */

/**
 * Materialize a connection to a remote server.
 */


class Connection {
  /**
   * Initialize a new `Connection` with `options`.
   *
   * @param {object} options Options
   * @param {string|object} options.remote Remote
   * @param {Stream} [options.stdout] Stdout stream
   * @param {Stream} [options.stderr] Stderr stream
   * @param {string} [options.key] SSH key
   * @param {function} [options.log] Log method
   * @param {boolean} [options.asUser] Use a custom user to run command
   * @param {number} [options.verbosityLevel] The SSH verbosity level: 0 (none), 1 (-v), 2 (-vv), 3+ (-vvv)
   */
  constructor(options = {}) {
    this.options = options;
    this.remote = (0, _remote.parseRemote)(options.remote);
    this.remote.user = this.remote.user || 'deploy';
  }
  /**
   * Run a command remotely using SSH.
   * All exec options are also available.
   *
   * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback
   * @param {string} command Command to run
   * @param {object} [options] Options
   * @param {boolean} [options.tty] Force a TTY allocation.
   * @returns {ExecResult}
   * @throws {ExecError}
   */


  run(command, _ref2 = {}) {
    var _this = this;

    let ttyOption = _ref2.tty,
        cwd = _ref2.cwd,
        cmdOptions = _objectWithoutPropertiesLoose(_ref2, ["tty", "cwd"]);

    return _asyncToGenerator(function* () {
      let tty = ttyOption;

      if (command.startsWith('sudo') && typeof ttyOption === 'undefined') {
        (0, _util2.deprecateV3)('You should set "tty" option explictly when you use "sudo".');
        tty = true;
      }

      _this.log('Running "%s" on host "%s".', command, _this.remote.host);

      const cmd = _this.buildSSHCommand(command, {
        tty,
        cwd
      });

      return _this.runLocally(cmd, cmdOptions);
    })();
  }
  /**
   * Run a copy command using either rsync or scp.
   * All exec options are also available.
   *
   * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback
   * @deprecated
   * @param {string} src Source
   * @param {string} dest Destination
   * @param {object} [options] Options
   * @param {boolean} [options.direction] Specify "remoteToLocal" to copy from "remote". By default it will copy from remote.
   * @param {string[]} [options.ignores] Specify a list of files to ignore.
   * @param {string[]|string} [options.rsync] Specify a set of rsync arguments.
   * @returns {ExecResult|MultipleExecResult}
   * @throws {ExecError}
   */


  copy(src, dest, _ref3 = {}) {
    var _this2 = this;

    let direction = _ref3.direction,
        options = _objectWithoutPropertiesLoose(_ref3, ["direction"]);

    return _asyncToGenerator(function* () {
      (0, _util2.deprecateV5)('"copy" method is deprecated, please use "copyToRemote", "copyFromRemote", "scpCopyToRemote" or "scpCopyFromRemote".');
      if (direction === 'remoteToLocal') return _this2.autoCopyFromRemote(src, dest, options);
      return _this2.autoCopyToRemote(src, dest, options);
    })();
  }
  /**
   * Run a copy from the local to the remote using rsync.
   * All exec options are also available.
   *
   * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback
   * @param {string} src Source
   * @param {string} dest Destination
   * @param {object} [options] Options
   * @param {string[]} [options.ignores] Specify a list of files to ignore.
   * @param {string[]|string} [options.rsync] Specify a set of rsync arguments.
   * @returns {ExecResult}
   * @throws {ExecError}
   */


  copyToRemote(src, dest, options) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const remoteDest = `${(0, _remote.formatRemote)(_this3.remote)}:${dest}`;
      return _this3.rsyncCopy(src, remoteDest, options);
    })();
  }
  /**
   * Run a copy from the remote to the local using rsync.
   * All exec options are also available.
   *
   * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback
   * @param {string} src Source
   * @param {string} dest Destination
   * @param {object} [options] Options
   * @param {string[]} [options.ignores] Specify a list of files to ignore.
   * @param {string[]|string} [options.rsync] Specify a set of rsync arguments.
   * @returns {ExecResult}
   * @throws {ExecError}
   */


  copyFromRemote(src, dest, options) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const remoteSrc = `${(0, _remote.formatRemote)(_this4.remote)}:${src}`;
      return _this4.rsyncCopy(remoteSrc, dest, options);
    })();
  }
  /**
   * Run a copy from the local to the remote using scp.
   * All exec options are also available.
   *
   * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback
   * @param {string} src Source
   * @param {string} dest Destination
   * @param {object} [options] Options
   * @param {string[]} [options.ignores] Specify a list of files to ignore.
   * @param {...object} [cmdOptions] Command options
   * @returns {ExecResult}
   * @throws {ExecError}
   */


  scpCopyToRemote(src, dest, _ref4 = {}) {
    var _this5 = this;

    let ignores = _ref4.ignores,
        cmdOptions = _objectWithoutPropertiesLoose(_ref4, ["ignores"]);

    return _asyncToGenerator(function* () {
      const archive = _path.default.basename((yield tmpName({
        postfix: '.tar.gz'
      })));

      const srcDir = _path.default.dirname(src);

      const remoteDest = `${(0, _remote.formatRemote)(_this5.remote)}:${dest}`;
      const compress = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: srcDir
      }), '&&', (0, _tar.formatTarCommand)({
        mode: 'compress',
        file: _path.default.basename(src),
        archive,
        excludes: ignores
      })]);
      const createDestFolder = (0, _mkdir.formatMkdirCommand)({
        folder: dest
      });
      const copy = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: srcDir
      }), '&&', (0, _scp.formatScpCommand)({
        port: _this5.remote.port,
        key: _this5.options.key,
        src: archive,
        dest: remoteDest
      })]);
      const cleanSrc = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: srcDir
      }), '&&', (0, _rm.formatRmCommand)({
        file: archive
      })]);
      const extract = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: dest
      }), '&&', (0, _tar.formatTarCommand)({
        mode: 'extract',
        archive
      })]);
      const cleanDest = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: dest
      }), '&&', (0, _rm.formatRmCommand)({
        file: archive
      })]);
      return _this5.aggregate([() => _this5.runLocally(compress, cmdOptions), () => _this5.run(createDestFolder, cmdOptions), () => _this5.runLocally(copy, cmdOptions), () => _this5.runLocally(cleanSrc, cmdOptions), () => _this5.run(extract, cmdOptions), () => _this5.run(cleanDest, cmdOptions)]);
    })();
  }
  /**
   * Run a copy from the remote to the local using scp.
   * All exec options are also available.
   *
   * @see https://nodejs.org/dist/latest-v8.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback
   * @param {string} src Source
   * @param {string} dest Destination
   * @param {object} [options] Options
   * @param {string[]} [options.ignores] Specify a list of files to ignore.
   * @param {...object} [cmdOptions] Command options
   * @returns {MultipleExecResult}
   * @throws {ExecError}
   */


  scpCopyFromRemote(src, dest, _ref5 = {}) {
    var _this6 = this;

    let ignores = _ref5.ignores,
        cmdOptions = _objectWithoutPropertiesLoose(_ref5, ["ignores"]);

    return _asyncToGenerator(function* () {
      const archive = _path.default.basename((yield tmpName({
        postfix: '.tar.gz'
      })));

      const srcDir = _path.default.dirname(src);

      const srcArchive = _path.default.join(srcDir, archive);

      const remoteSrcArchive = `${(0, _remote.formatRemote)(_this6.remote)}:${srcArchive}`;
      const compress = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: srcDir
      }), '&&', (0, _tar.formatTarCommand)({
        mode: 'compress',
        file: _path.default.basename(src),
        archive,
        excludes: ignores
      })]);
      const createDestFolder = (0, _mkdir.formatMkdirCommand)({
        folder: dest
      });
      const copy = (0, _scp.formatScpCommand)({
        port: _this6.remote.port,
        key: _this6.options.key,
        src: remoteSrcArchive,
        dest
      });
      const cleanSrc = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: srcDir
      }), '&&', (0, _rm.formatRmCommand)({
        file: archive
      })]);
      const extract = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: dest
      }), '&&', (0, _tar.formatTarCommand)({
        mode: 'extract',
        archive
      })]);
      const cleanDest = (0, _util.joinCommandArgs)([(0, _cd.formatCdCommand)({
        folder: dest
      }), '&&', (0, _rm.formatRmCommand)({
        file: archive
      })]);
      return _this6.aggregate([() => _this6.run(compress, cmdOptions), () => _this6.runLocally(createDestFolder, cmdOptions), () => _this6.runLocally(copy, cmdOptions), () => _this6.run(cleanSrc, cmdOptions), () => _this6.runLocally(extract, cmdOptions), () => _this6.runLocally(cleanDest, cmdOptions)]);
    })();
  }
  /**
   * Build an SSH command.
   *
   * @private
   * @param {string} command
   * @param {object} options
   * @returns {string}
   */


  buildSSHCommand(command, options) {
    return (0, _ssh.formatSshCommand)(_extends({
      port: this.remote.port,
      key: this.options.key,
      password: this.options.password,
      strict: this.options.strict,
      tty: this.options.tty,
      verbosityLevel: this.options.verbosityLevel,
      remote: (0, _remote.formatRemote)(this.remote),
      command: (0, _raw.formatRawCommand)({
        command,
        asUser: this.options.asUser
      })
    }, options));
  }
  /**
   * Abstract method to copy using rsync.
   *
   * @private
   * @param {string} src
   * @param {string} dest
   * @param {object} options
   * @param {string[]|string} rsync Additional arguments
   * @param {string[]} ignores Files to ignore
   * @param {...object} cmdOptions Command options
   * @returns {ExecResult}
   * @throws {ExecError}
   */


  rsyncCopy(src, dest, _ref6 = {}) {
    var _this7 = this;

    let rsync = _ref6.rsync,
        ignores = _ref6.ignores,
        cmdOptions = _objectWithoutPropertiesLoose(_ref6, ["rsync", "ignores"]);

    return _asyncToGenerator(function* () {
      _this7.log('Copy "%s" to "%s" via rsync', src, dest);

      const sshCommand = (0, _ssh.formatSshCommand)({
        port: _this7.remote.port,
        key: _this7.options.key,
        password: _this7.options.password,
        strict: _this7.options.strict,
        tty: _this7.options.tty
      });
      const cmd = (0, _rsync.formatRsyncCommand)({
        src,
        dest,
        remoteShell: sshCommand,
        additionalArgs: typeof rsync === 'string' ? [rsync] : rsync,
        excludes: ignores
      });
      return _this7.runLocally(cmd, cmdOptions);
    })();
  }
  /**
   * Automatic copy to remote method.
   * Choose rsync and fallback to scp if not available.
   *
   * @private
   * @param {string} src
   * @param {string} dest
   * @param {object} options
   * @returns {ExecResult|MultipleExecResult}
   * @throws {ExecError}
   */


  autoCopyToRemote(src, dest, options) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const rsyncAvailable = yield (0, _rsync.isRsyncSupported)();
      const method = rsyncAvailable ? 'copyToRemote' : 'scpCopyToRemote';
      return _this8[method](src, dest, options);
    })();
  }
  /**
   * Automatic copy from remote method.
   * Choose rsync and fallback to scp if not available.
   *
   * @private
   * @param {string} src
   * @param {string} dest
   * @param {object} options
   * @returns {ExecResult|MultipleExecResult}
   * @throws {ExecError}
   */


  autoCopyFromRemote(src, dest, options) {
    var _this9 = this;

    return _asyncToGenerator(function* () {
      const rsyncAvailable = yield (0, _rsync.isRsyncSupported)();
      const method = rsyncAvailable ? 'copyFromRemote' : 'scpCopyFromRemote';
      return _this9[method](src, dest, options);
    })();
  }
  /**
   * Aggregate some exec tasks.
   *
   * @private
   * @param {Promise.<ExecResult>[]} tasks An array of tasks
   * @returns {MultipleExecResult}
   * @throws {ExecError}
   */


  aggregate(tasks) {
    return _asyncToGenerator(function* () {
      const results = yield (0, _util2.series)(tasks);
      return results.reduce((aggregate, result) => ({
        stdout: String(aggregate.stdout) + String(result.stdout),
        stderr: String(aggregate.stderr) + String(result.stderr),
        children: [...aggregate.children, result.child]
      }), {
        stdout: '',
        stderr: '',
        children: []
      });
    })();
  }
  /**
   * Log using logger.
   *
   * @private
   * @param {...*} args
   */


  log(...args) {
    if (this.options.log) this.options.log(...args);
  }
  /**
   * Method used to run a command locally.
   *
   * @private
   * @param {string} cmd
   * @param {object} [options]
   * @param {Buffer} [options.stdout] stdout buffer
   * @param {Buffer} [options.stderr] stderr buffer
   * @param {...object} [options.cmdOptions] Command options
   * @returns {ExecResult}
   * @throws {ExecError}
   */


  runLocally(cmd, _ref7 = {}) {
    var _this10 = this;

    let stdout = _ref7.stdout,
        stderr = _ref7.stderr,
        cmdOptions = _objectWithoutPropertiesLoose(_ref7, ["stdout", "stderr"]);

    return _asyncToGenerator(function* () {
      const stdoutPipe = stdout || _this10.options.stdout;
      const stderrPipe = stderr || _this10.options.stderr;
      return (0, _util2.exec)(cmd, cmdOptions, child => {
        if (stdoutPipe) child.stdout.pipe(new _streamLineWrapper.default({
          prefix: `@${_this10.remote.host} `
        })).pipe(stdoutPipe);
        if (stderrPipe) child.stderr.pipe(new _streamLineWrapper.default({
          prefix: `@${_this10.remote.host}-err `
        })).pipe(stderrPipe);
      });
    })();
  }

}

var _default = Connection;
exports.default = _default;