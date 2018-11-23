'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFetchData = exports.dynamic = exports.createDynamic = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icAjax = require('ic-ajax');

var _icAjax2 = _interopRequireDefault(_icAjax);

var _createDynamic2 = require('./createDynamic');

var _createDynamic3 = _interopRequireDefault(_createDynamic2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDynamic = exports.createDynamic = _createDynamic3.default; /**
                                                                      * @name: ic-fetch-data ;
                                                                      * @author: linzp ;
                                                                      * @description: React获取数据容器 ;
                                                                      * */

var dynamic = exports.dynamic = createDynamic(_icAjax2.default);
var createFetchData = function createFetchData(ajax) {
  return function (_ref) {
    var url = _ref.url,
        data = _ref.data,
        params = _ref.params,
        options = (0, _objectWithoutProperties3.default)(_ref, ['url', 'data', 'params']);
    return function (WrappedComponent) {
      var FetchData = createDynamic(ajax)(WrappedComponent);
      return function (props) {
        return _react2.default.createElement(FetchData, (0, _extends3.default)({}, props, { url: url, params: params, options: options }));
      };
    };
  };
};

exports.createFetchData = createFetchData;
exports.default = createFetchData(_icAjax2.default);