'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (onBlur, dom) {
    var outerRef = (0, _react.useRef)();

    var _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray3.default)(_useState, 2),
        focus = _useState2[0],
        setFocus = _useState2[1];

    var outerClickHandler = function outerClickHandler(e) {
        if (!outerRef.current.contains(e.target)) {
            if (focus && onBlur) {
                setFocus(false);
                onBlur(e);
            }
        }
    };

    var handlerFocus = function handlerFocus() {
        setFocus(true);
    };

    (0, _react.useEffect)(function () {
        var eventDom = dom || document.body;
        eventDom.addEventListener('click', outerClickHandler);
        outerRef.current.addEventListener('focus', handlerFocus, true);
        return function () {
            outerRef.current.removeEventListener('focus', handlerFocus, true);
            eventDom.removeEventListener('click', outerClickHandler);
        };
    });
    return outerRef;
}; /**
    * @name: ic-use-blur ;
    * @author: admin ;
    * @description: 在复合表单组件中控制blur事件的触发 ;
    * */