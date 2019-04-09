"use strict";

exports.__esModule = true;
exports.parseRemote = parseRemote;
exports.formatRemote = formatRemote;

var _util = require("./util");

function parseRemote(remote) {
  if (remote && remote.host) return remote;
  if (typeof remote !== 'string') throw new Error('A remote must be a string');
  if (remote === '') throw new Error('A remote cannot be an empty string');
  const matches = remote.match(/(([^@:]+)@)?([^@:]+)(:(.+))?/);

  if (matches) {
    const user = matches[2],
          host = matches[3],
          port = matches[5];
    const options = {
      user,
      host
    };
    if (port) options.port = Number(port);

    if (!user) {
      (0, _util.deprecateV3)('Default user "deploy" is deprecated, please specify it explictly.');
      options.user = 'deploy';
    }

    return options;
  }

  return {
    user: 'deploy',
    host: remote
  };
}

function formatRemote({
  user,
  host
}) {
  return `${user}@${host}`;
}