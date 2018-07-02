'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = function (_ref, defaultError) {
    var status = _ref.status,
        data = _ref.data;

    if (status < 200 || status > 300) {
        return ERROR_MAP[status] || '连接出错';
    }
    return getAjaxError(data, defaultError);
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name: ic-ajax-error ;
 * @author: admin ;
 * @description: 处理ajax错误 ;
 * */

var ERROR_MAP = {
    400: '请求错误',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求出错',
    408: '请求超时',
    500: '服务器错误',
    501: '服务器未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'HTTP版本不受支持'
};

var getAjaxError = function getAjaxError() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '很抱歉，出错了，请重试~';

    var error = [];

    if (data.hasOwnProperty('err_no')) {
        if (data.err_no == '0') {
            return '';
        }
        if ((0, _typeof3.default)(data.results) === 'object') {
            (0, _keys2.default)(data.results).forEach(function (key) {
                if (typeof data.results[key] === 'string') {
                    error.push(data.results[key]);
                }
            });
        }
        return error.join(' ') || data.err_msg || defaultError;
    } else {
        (0, _keys2.default)(data).forEach(function (key) {
            var childrenData = data[key];
            if ((typeof childrenData === 'undefined' ? 'undefined' : (0, _typeof3.default)(childrenData)) === 'object' && childrenData.hasOwnProperty('err_no') && childrenData.err_no != '0') {
                error.push(getAjaxError(childrenData));
            }
        });
        return error.join(' ');
    }
};