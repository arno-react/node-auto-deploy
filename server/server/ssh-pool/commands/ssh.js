"use strict";

exports.__esModule = true;
exports.formatSshCommand = formatSshCommand;

var _util = require("./util");

function wrapCwd(cwd, command) {
  return `cd ${cwd} > /dev/null; ${command}; cd - > /dev/null`;
}

function formatSshCommand({
  port,
  key,
  strict,
  password,
  tty,
  remote,
  cwd,
  command,
  verbosityLevel
}) {
  let args = ['ssh'];
  if(password){
    args = ['sshpass', '-p', password, 'ssh'];
  }

  if (verbosityLevel) {
    switch (verbosityLevel) {
      case verbosityLevel <= 0:
        break;

      case 1:
        args = [...args, '-v'];
        break;

      case 2:
        args = [...args, '-vv'];
        break;

      default:
        args = [...args, '-vvv'];
        break;
    }
  }

  if (tty) args = [...args, '-tt'];
  if (port) args = [...args, '-p', port];
  if (key) args = [...args, '-i', key];
  if (strict !== undefined) args = [...args, '-o', `StrictHostKeyChecking=${strict}`];
  if (remote) args = [...args, remote];
  const cwdCommand = cwd ? wrapCwd(cwd, command) : command;
  if (command) args = [...args, (0, _util.wrapCommand)(cwdCommand)];
  return (0, _util.joinCommandArgs)(args);
}