"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setView = setView;
exports.setEvent = setEvent;
/**
 * @name: ic-beacon ;
 * @author: linzp ;
 * @description: 代码统计代码 ;
 * */

window._czc = window._czc || [];

function setView(content_url, referer_url) {
    _czc.push(["_trackPageview", content_url, referer_url]);
};

function setEvent() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    _czc.push(["_trackEvent"].concat(args));
};