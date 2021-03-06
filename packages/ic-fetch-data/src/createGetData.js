import axios from "axios/index";

export default (currentCache, ajax) => {
    let ajaxWithCache = (cacheKey) => (props) => {
        let namespace = 'global';
        if (typeof cacheKey === 'string' && cacheKey.length > 0) {
            namespace = cacheKey;
        }
        const cache = currentCache.getCache(props, namespace);
        if (cache) {
            return cache;
        } else {
            const promise = ajax(props);
            currentCache.append(props, promise, namespace);
            return promise;
        }
    };

    return ({url, params, data, onError, onStart, cancelHandler, onSuccess, onComplete, options, cache, getResults}) => {
        let cancelToken = new axios.CancelToken(cancelHandler);
        onStart && onStart();
        const getAjaxData=(cache ? ajaxWithCache(cache) : ajax)({
            url, params, data, cancelToken, ...options
        }).then(({data}) => {
            const {err_no} = getResults(data);
            if (err_no == '0') {
                onSuccess && onSuccess(data);
            } else {
                return Promise.reject(new Error(data));
            }
        }).catch((e) => {
            if (!axios.isCancel(e)) {
                onError && onError(e);
            }
        }).then(() => {
            onComplete && onComplete();
        });

        getAjaxData.clean=()=>{
            if (typeof cache === 'string' && cache.length > 0) {
                currentCache.clean(cache);
            } else {
                console.warn(cache ? '当前的缓存保存在全局命名空间下，请使用全局clean方法' : "cache没有被开启");
            }
        };
        return getAjaxData;
    };
};
