'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.setCache = setCache;
exports.getCache = getCache;
exports.removeCache = removeCache;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name: ic-cache ;
 * @author: linzp ;
 * @description: 操作localstore ;
 * */

function setCache(key, value) {
    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        value = (0, _stringify2.default)(value);
    }
    window.localStorage.setItem(key, value);
};

function getCache(key) {
    var isObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var value = window.localStorage.getItem(key) || '';
    if (isObject) {
        if (!value) {
            return {};
        }
        try {
            value = JSON.parse(value);
        } catch (e) {
            value = {};
        }
    }
    return value;
};

function removeCache(key) {
    window.localStorage.removeItem(key);
}

exports.default = { setCache: setCache, getCache: getCache, removeCache: removeCache };