"use strict";

exports.__esModule = true;
exports.formatRmCommand = formatRmCommand;

var _util = require("./util");

function formatRmCommand({
  file
}) {
  (0, _util.requireArgs)(['file'], {
    file
  }, 'rm');
  const args = ['rm', file];
  return (0, _util.joinCommandArgs)(args);
}