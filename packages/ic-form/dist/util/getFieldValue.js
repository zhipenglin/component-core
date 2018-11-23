'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isEvent = require('./isEvent');

var _isEvent2 = _interopRequireDefault(_isEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (event, value) {
    if ((0, _isEvent2.default)(event)) {
        if (value === undefined) {
            value = event.target.value;
        }
    } else {
        value = event;
    }
    return value;
};