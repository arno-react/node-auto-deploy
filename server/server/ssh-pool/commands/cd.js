"use strict";

exports.__esModule = true;
exports.formatCdCommand = formatCdCommand;

var _util = require("./util");

function formatCdCommand({
  folder
}) {
  (0, _util.requireArgs)(['folder'], {
    folder
  }, 'cd');
  const args = ['cd', folder];
  return (0, _util.joinCommandArgs)(args);
}