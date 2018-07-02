'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (WrappedComponent) {
    var Submit = function (_PureComponent) {
        (0, _inherits3.default)(Submit, _PureComponent);

        function Submit() {
            var _ref;

            var _temp, _this, _ret;

            (0, _classCallCheck3.default)(this, Submit);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Submit.__proto__ || (0, _getPrototypeOf2.default)(Submit)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
                isLoading: false
            }, _this.handlerClick = function (e) {
                var _this$props = _this.props,
                    onClick = _this$props.onClick,
                    api = _this$props.api;

                if (_this.state.isLoading) {
                    return;
                }
                onClick && onClick(e);
                _this.setState({ isLoading: true });
                api.submit().then(function () {
                    return _this.setState({ isLoading: false });
                });
            }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
        }

        (0, _createClass3.default)(Submit, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    api = _props.api,
                    props = (0, _objectWithoutProperties3.default)(_props, ['api']);

                return _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, props, { data: api.data, isLoading: this.state.isLoading, isPass: api.isPass, onClick: this.handlerClick }));
            }
        }]);
        return Submit;
    }(_react.PureComponent);

    return function (props) {
        return _react2.default.createElement(
            _Context2.default.Consumer,
            null,
            function (fieldProps) {
                return _react2.default.createElement(Submit, (0, _extends3.default)({}, props, { api: fieldProps }));
            }
        );
    };
};