'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (errMsg, label) {
    return typeof errMsg === 'string' ? errMsg.replace('%s', label) : errMsg(label);
};