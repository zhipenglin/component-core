'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listLoader = exports.dynamicListLoader = exports.createListLoader = exports.createFetchData = exports.dynamic = exports.createDynamic = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icAjax = require('@core/ic-ajax');

var _icAjax2 = _interopRequireDefault(_icAjax);

var _createDynamic2 = require('./createDynamic');

var _createDynamic3 = _interopRequireDefault(_createDynamic2);

var _createListLoader2 = require('./createListLoader');

var _createListLoader3 = _interopRequireDefault(_createListLoader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name: ic-fetch-data ;
 * @author: linzp ;
 * @description: React获取数据容器 ;
 * */

var createDynamic = exports.createDynamic = _createDynamic3.default;
var dynamic = exports.dynamic = createDynamic(_icAjax2.default);
var createFetchData = function createFetchData(ajax) {
  return function (_ref) {
    var url = _ref.url,
        data = _ref.data,
        params = _ref.params,
        cache = _ref.cache,
        loading = _ref.loading,
        error = _ref.error,
        options = _ref.options,
        args = (0, _objectWithoutProperties3.default)(_ref, ['url', 'data', 'params', 'cache', 'loading', 'error', 'options']);
    return function (WrappedComponent) {
      var FetchData = createDynamic(ajax)(WrappedComponent);
      return function (props) {
        return _react2.default.createElement(FetchData, (0, _extends3.default)({}, props, { url: url, params: params, data: data,
          cache: cache,
          loading: loading,
          error: error,
          options: (0, _assign2.default)({}, args, options) }));
      };
    };
  };
};

exports.createFetchData = createFetchData;
var createListLoader = exports.createListLoader = _createListLoader3.default;
var dynamicListLoader = exports.dynamicListLoader = createListLoader(_icAjax2.default);
var listLoader = function listLoader(ajax) {
  return function (_ref2) {
    var url = _ref2.url,
        data = _ref2.data,
        params = _ref2.params,
        cache = _ref2.cache,
        loading = _ref2.loading,
        error = _ref2.error,
        options = _ref2.options,
        args = (0, _objectWithoutProperties3.default)(_ref2, ['url', 'data', 'params', 'cache', 'loading', 'error', 'options']);
    return function (WrappedComponent) {
      var ListLoader = createListLoader(ajax)(WrappedComponent);
      return function (props) {
        return _react2.default.createElement(ListLoader, (0, _extends3.default)({}, props, { url: url, data: data, params: params,
          cache: cache,
          loading: loading,
          error: error,
          options: (0, _assign2.default)({}, args, options) }));
      };
    };
  };
};

exports.listLoader = listLoader;
exports.default = createFetchData(_icAjax2.default);