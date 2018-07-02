'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createInstance = exports.Filter = undefined;

var _Filter = require('./Filter');

Object.defineProperty(exports, 'Filter', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Filter).default;
    }
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _useRequestURLEncoded = require('./useRequestURLEncoded');

var _useRequestURLEncoded2 = _interopRequireDefault(_useRequestURLEncoded);

var _useRequestFilter = require('./useRequestFilter');

var _useRequestFilter2 = _interopRequireDefault(_useRequestFilter);

var _useResponseError = require('./useResponseError');

var _useResponseError2 = _interopRequireDefault(_useResponseError);

var _useResponseFilter = require('./useResponseFilter');

var _useResponseFilter2 = _interopRequireDefault(_useResponseFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createInstance = exports.createInstance = function createInstance(preset) {
    var ajax = _axios2.default.create({
        validateStatus: function validateStatus() {
            return true;
        }
    });

    ajax.interceptors.request.use(_useRequestURLEncoded2.default);

    ajax.interceptors.request.use(_useRequestFilter2.default);

    ajax.interceptors.response.use(_useResponseError2.default);

    ajax.interceptors.response.use(_useResponseFilter2.default);

    preset && typeof preset === 'function' && preset(ajax);

    return ajax;
};

exports.default = createInstance();