"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _Filter = require("./Filter");

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (response) {
    var errMsg = response.errMsg,
        config = response.config;

    if (errMsg !== '') {
        return response;
    }

    return _Filter2.default.filterIterator(config.filter, function (filter) {
        return filter.response({
            data: response.data,
            config: config
        }).then(function (_ref) {
            var data = _ref.data;
            return (0, _assign2.default)(response, { data: data });
        });
    }, true).then(function () {
        return response;
    });
};