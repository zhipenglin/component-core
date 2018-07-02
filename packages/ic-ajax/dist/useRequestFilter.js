'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _Filter = require('./Filter');

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    return _Filter2.default.filterIterator(config.filter, function (filter) {
        return filter.request(config);
    }).then(function (newConfig) {
        return (0, _assign2.default)(config, newConfig);
    });
};