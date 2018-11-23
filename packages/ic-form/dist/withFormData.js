'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = withFormData;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withFormData(WrappedComponent) {
    return function (props) {
        return _react2.default.createElement(
            _Context2.default.Consumer,
            null,
            function (fieldProps) {
                return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, props, { api: fieldProps }));
            }
        );
    };
};