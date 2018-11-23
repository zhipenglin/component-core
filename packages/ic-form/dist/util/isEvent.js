"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (event) {
    return event instanceof window.Event || event.nativeEvent instanceof window.Event;
};