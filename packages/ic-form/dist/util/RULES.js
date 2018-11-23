'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.presetRules = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RULES = {
    REQ: function REQ(value) {
        return {
            result: function (value) {
                if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
                    var values = (0, _values2.default)(value);
                    return values.length > 0 && values.every(function (item) {
                        return !!item;
                    });
                } else if (typeof value === 'number') {
                    return !isNaN(value);
                } else {
                    return !(value === undefined || value === null || value === '' || value.length === 0);
                }
            }(value),
            errMsg: ''
        };
    },
    NAME: function NAME(value) {
        if (!RULES.REQ(value).result) return { result: true, errMsg: '' };
        return {
            result: /^[A-Za-z\u4e00-\u9fa5]+$/.test(value),
            errMsg: '请填写有效姓名'
        };
    },
    TEL: function TEL(value) {
        if (!RULES.REQ(value).result) return { result: true, errMsg: '' };
        return {
            result: /^1[0-9]{10}$/.test(value),
            errMsg: '请输入有效的手机号'
        };
    },
    EMAIL: function EMAIL(value) {
        if (!RULES.REQ(value).result) return { result: true, errMsg: '' };
        return {
            result: /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value),
            errMsg: '请输入有效的邮箱'
        };
    },
    LEN: function LEN(value, start, end) {
        if (!RULES.REQ(value).result) return { result: true, errMsg: '' };
        value = value.toString();
        if (end === start && value.length !== Number(end)) {
            return {
                result: false, errMsg: '%s\u957F\u5EA6\u5FC5\u987B\u7B49\u4E8E' + end
            };
        }
        if (value.length < start) {
            return {
                result: false, errMsg: '%s\u957F\u5EA6\u5FC5\u987B\u5927\u4E8E' + start
            };
        }
        if (end && value.length > end) {
            return {
                result: false, errMsg: '%s\u957F\u5EA6\u5FC5\u987B\u5C0F\u4E8E' + end
            };
        }
        return { result: true };
    }
};
exports.default = RULES;
var presetRules = exports.presetRules = function presetRules() {
    var newRules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    (0, _assign2.default)(RULES, newRules);
};