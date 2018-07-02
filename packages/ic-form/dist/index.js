'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presetRules = exports.submit = exports.field = undefined;

var _Form2 = require('./Form');

var _Form3 = _interopRequireDefault(_Form2);

var _field2 = require('./field');

var _field3 = _interopRequireDefault(_field2);

var _submit2 = require('./submit');

var _submit3 = _interopRequireDefault(_submit2);

var _RULES = require('./util/RULES');

var _RULES2 = _interopRequireDefault(_RULES);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name: ic-form ;
 * @author: admin ;
 * @description: 用于表单校验的组件 ;
 * */

_Form3.default.field = _field3.default;
_Form3.default.submit = _submit3.default;

exports.default = _Form3.default;
var field = exports.field = _field3.default;

var submit = exports.submit = _submit3.default;

var presetRules = exports.presetRules = _RULES2.default;