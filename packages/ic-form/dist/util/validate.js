'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compileRule = function compileRule(rule, rules) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(value, errMsg) {
            var errorMsg, result, ruleList, index, stc, _stc$split, _stc$split2, key, args, res;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            errorMsg = '', result = true, ruleList = rule.split(' ');
                            index = 0;

                        case 2:
                            if (!(index < ruleList.length)) {
                                _context.next = 20;
                                break;
                            }

                            stc = ruleList[index];
                            _stc$split = stc.split('-'), _stc$split2 = (0, _toArray3.default)(_stc$split), key = _stc$split2[0], args = _stc$split2.slice(1);

                            if (!(typeof rules[key] === 'function')) {
                                _context.next = 15;
                                break;
                            }

                            _context.next = 8;
                            return rules[key].apply(rules, [value].concat((0, _toConsumableArray3.default)(args)));

                        case 8:
                            res = _context.sent;

                            if (res.result) {
                                _context.next = 13;
                                break;
                            }

                            errorMsg = res.errMsg;
                            result = false;
                            return _context.abrupt('break', 20);

                        case 13:
                            _context.next = 17;
                            break;

                        case 15:
                            console.error('\u89C4\u5219"' + key + '"\u4E0D\u662F\u4E00\u4E2Afunction\uFF0C\u5C06\u88AB\u5FFD\u7565\uFF0C\u8BF7\u53C2\u8003rule\u5B9A\u5236\u89C4\u5219');
                            return _context.abrupt('continue', 17);

                        case 17:
                            index++;
                            _context.next = 2;
                            break;

                        case 20:
                            return _context.abrupt('return', { result: result, errMsg: result ? '' : errMsg || errorMsg });

                        case 21:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};

exports.default = function (value, _ref2) {
    var rule = _ref2.rule,
        rules = _ref2.rules,
        _ref2$errMsg = _ref2.errMsg,
        errMsg = _ref2$errMsg === undefined ? '' : _ref2$errMsg;

    if (rule instanceof RegExp) {
        return { result: rule.test(value), errMsg: errMsg };
    }

    if (typeof rule === 'function') {
        return { result: rule(value), errMsg: errMsg };
    }

    if (typeof rule === 'string') {
        return compileRule(rule, rules)(value, errMsg);
    }

    return { result: true, errMsg: '' };
};