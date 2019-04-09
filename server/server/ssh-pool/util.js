"use strict";

exports.__esModule = true;
exports.deprecateV3 = deprecateV3;
exports.deprecateV5 = deprecateV5;
exports.exec = exports.series = void 0;

var _child_process = require("child_process");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable no-console */
const series =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (tasks) {
    return new Promise((resolve, reject) => {
      const tasksCopy = [...tasks];

      const next = results => {
        if (tasksCopy.length === 0) {
          resolve(results);
          return;
        }

        const task = tasksCopy.shift();
        task().then(result => next([...results, result])).catch(reject);
      };

      next([]);
    });
  });

  return function series(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.series = series;
const DEFAULT_CMD_OPTIONS = {
  maxBuffer: 1000 * 1024
};

const exec =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (cmd, options, childModifier) {
    return new Promise((resolve, reject) => {
      const child = (0, _child_process.exec)(cmd, _extends({}, DEFAULT_CMD_OPTIONS, options), (error, stdout, stderr) => {
        if (error) {
          /* eslint-disable no-param-reassign */
          error.stdout = stdout;
          error.stderr = stderr;
          error.child = child;
          /* eslint-enable no-param-reassign */

          reject(error);
        } else {
          resolve({
            child,
            stdout,
            stderr
          });
        }
      });
      if (childModifier) childModifier(child);
    });
  });

  return function exec(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.exec = exec;

function deprecateV3(...args) {
  console.warn(...args, 'It will break in v3.0.0.');
}

function deprecateV5(...args) {
  console.warn(...args, 'It will break in v5.0.0.');
}