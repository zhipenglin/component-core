'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _index = require('axios/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (currentCache, ajax) {
    var ajaxWithCache = function ajaxWithCache(cacheKey) {
        return function (props) {
            var namespace = 'global';
            if (typeof cacheKey === 'string' && cacheKey.length > 0) {
                namespace = cacheKey;
            }
            var cache = currentCache.getCache(props, namespace);
            if (cache) {
                return cache;
            } else {
                var promise = ajax(props);
                currentCache.append(props, promise, namespace);
                return promise;
            }
        };
    };

    return function (_ref) {
        var url = _ref.url,
            params = _ref.params,
            data = _ref.data,
            onError = _ref.onError,
            onStart = _ref.onStart,
            cancelHandler = _ref.cancelHandler,
            onSuccess = _ref.onSuccess,
            onComplete = _ref.onComplete,
            options = _ref.options,
            cache = _ref.cache,
            getResults = _ref.getResults;

        var cancelToken = new _index2.default.CancelToken(cancelHandler);
        onStart && onStart();
        var getAjaxData = (cache ? ajaxWithCache(cache) : ajax)((0, _extends3.default)({
            url: url, params: params, data: data, cancelToken: cancelToken }, options)).then(function (_ref2) {
            var data = _ref2.data;

            var _getResults = getResults(data),
                err_no = _getResults.err_no;

            if (err_no == '0') {
                onSuccess && onSuccess(data);
            } else {
                return _promise2.default.reject(new Error(data));
            }
        }).catch(function (e) {
            if (!_index2.default.isCancel(e)) {
                onError && onError(e);
            }
        }).then(function () {
            onComplete && onComplete();
        });

        getAjaxData.clean = function () {
            if (typeof cache === 'string' && cache.length > 0) {
                currentCache.clean(cache);
            } else {
                console.warn(cache ? '当前的缓存保存在全局命名空间下，请使用全局clean方法' : "cache没有被开启");
            }
        };
        return getAjaxData;
    };
};