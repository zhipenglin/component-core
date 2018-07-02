"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _normalizeHeaderName = require("axios/lib/helpers/normalizeHeaderName");

var _normalizeHeaderName2 = _interopRequireDefault(_normalizeHeaderName);

var _merge = require("lodash/merge");

var _merge2 = _interopRequireDefault(_merge);

var _qs = require("qs");

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    var headers = (0, _merge2.default)({}, config.headers.common, config.headers[config.method], config.headers);
    (0, _normalizeHeaderName2.default)(headers, 'Content-Type');

    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        try {
            config.data = _qs2.default.stringify(config.data);
        } catch (e) {}
    }
    return config;
};