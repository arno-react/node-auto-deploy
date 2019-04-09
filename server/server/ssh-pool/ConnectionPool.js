"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Connection = _interopRequireDefault(require("./Connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class ConnectionPool {
  /**
   * Initialize a new `ConnectionPool` with `connections`.
   * All Connection options are also supported.
   *
   * @param {Connection|string[]} connections Connections
   * @param {object} [options] Options
   */
  constructor(connections, options) {
    this.connections = connections.map(connection => {
      if (connection instanceof _Connection.default) return connection;
      return new _Connection.default(_extends({
        remote: connection
      }, options));
    });
  }

}

;
['run', 'copy', 'copyToRemote', 'copyFromRemote', 'scpCopyToRemote', 'scpCopyFromRemote'].forEach(method => {
  ConnectionPool.prototype[method] = function (...args) {
    return Promise.all(this.connections.map(connection => connection[method](...args)));
  };
});
var _default = ConnectionPool;
exports.default = _default;