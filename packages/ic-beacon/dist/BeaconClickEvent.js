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

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BeaconEvent = function (_PureComponent) {
    (0, _inherits3.default)(BeaconEvent, _PureComponent);

    function BeaconEvent() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, BeaconEvent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BeaconEvent.__proto__ || (0, _getPrototypeOf2.default)(BeaconEvent)).call.apply(_ref, [this].concat(args))), _this), _this.handlerCLick = function (e) {
            var _this$props = _this.props,
                event = _this$props.event,
                onClick = _this$props.onClick;

            onClick && onClick(e);
            (0, _index.setEvent)(event, 'click');
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(BeaconEvent, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                type = _props.type,
                event = _props.event,
                children = _props.children,
                args = (0, _objectWithoutProperties3.default)(_props, ['type', 'event', 'children']);

            return _react2.default.createElement(type, (0, _extends3.default)({}, args, { onClick: this.handlerCLick }), children);
        }
    }]);
    return BeaconEvent;
}(_react.PureComponent);

BeaconEvent.defaultProps = {
    type: 'span'
};
exports.default = BeaconEvent;