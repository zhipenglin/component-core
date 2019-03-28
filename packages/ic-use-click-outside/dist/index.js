'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

exports.default = function (onClickOutside, dom) {
    var outerRef = (0, _react.useRef)();

    var outerClickHandler = function outerClickHandler(e) {
        if (!outerRef.current.contains(e.target)) {
            onClickOutside && onClickOutside(e);
        }
    };

    (0, _react.useEffect)(function () {
        var eventDom = dom || document.body;
        eventDom.addEventListener('click', outerClickHandler);
        return function () {
            eventDom.removeEventListener('click', outerClickHandler);
        };
    });
    return outerRef;
}; /**
    * @name: ic-use-click-outside ;
    * @author: admin ;
    * @description: 响应点击空白事件 ;
    * */