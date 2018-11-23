'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tween = require('@tweenjs/tween.js');

var _tween2 = _interopRequireDefault(_tween);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var animate = function animate() {
    (0, _raf2.default)(animate);
    _tween2.default.update();
}; /**
    * @name: ic-animate ;
    * @author: admin ;
    * @description: 实现react动画 ;
    * */


var createTween = function createTween(_ref) {
    var start = _ref.start,
        to = _ref.to,
        easing = _ref.easing,
        delay = _ref.delay,
        repeat = _ref.repeat,
        yoyo = _ref.yoyo;

    var tween = new _tween.Tween(start);
    to.forEach(function (item) {
        tween.to.apply(tween, (0, _toConsumableArray3.default)(item));
    });
    tween.easing(easing).delay(delay).repeat(repeat).yoyo(yoyo);

    return tween;
};

var Animate = function (_PureComponent) {
    (0, _inherits3.default)(Animate, _PureComponent);

    function Animate(props) {
        (0, _classCallCheck3.default)(this, Animate);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Animate.__proto__ || (0, _getPrototypeOf2.default)(Animate)).call(this, props));

        var start = props.start,
            to = props.to,
            easing = props.easing,
            delay = props.delay,
            repeat = props.repeat,
            yoyo = props.yoyo;

        animate();
        _this.state = {
            props: start
        };
        _this.tween = createTween(props);
        return _this;
    }

    (0, _createClass3.default)(Animate, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.tween.start();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                start = _props.start,
                to = _props.to,
                easing = _props.easing,
                delay = _props.delay,
                repeat = _props.repeat,
                yoyo = _props.yoyo,
                children = _props.children,
                props = (0, _objectWithoutProperties3.default)(_props, ['start', 'to', 'easing', 'delay', 'repeat', 'yoyo', 'children']);

            return _react2.default.createElement(
                'span',
                props,
                children(this.state.props)
            );
        }
    }]);
    return Animate;
}(_react.PureComponent);

exports.default = Animate;