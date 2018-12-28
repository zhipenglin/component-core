'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.default = function () {};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name: ic-wechat-share ;
 * @author: admin ;
 * @description: 微信分享sdk ;
 * */

var matched = window.navigator.userAgent.match(/MicroMessenger\/([\d|\.]+)/),
    isWechat = matched && matched.length > 1,
    isAndroid = /Android (\d+\.\d+(\.\d+)?)/i;

var isNormalVersion = function () {
    if (isWechat) {
        //if(major>6||){}
        var _matched$1$split = matched[1].split('.');

        var _matched$1$split2 = (0, _slicedToArray3.default)(_matched$1$split, 2);

        major = _matched$1$split2[0];
        minor = _matched$1$split2[1];
    }
}();