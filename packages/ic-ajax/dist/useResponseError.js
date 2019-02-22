"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _icAjaxError = require("@core/ic-ajax-error");

var _icAjaxError2 = _interopRequireDefault(_icAjaxError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (response) {
    if (response.config.ignoreError) {
        return response;
    }
    response.errMsg = (0, _icAjaxError2.default)(response);
    return response;
};