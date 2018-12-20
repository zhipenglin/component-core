import axios from "axios/index";

export default (currentCache, ajax) => {
    let ajaxWithCache = (props) => {
        const cache = currentCache.getCache(props);
        if (cache) {
            return cache;
        } else {
            const promise = ajax(props);
            currentCache.append(props, promise);
            return promise;
        }
    }, cancelHandler = () => {
    };

    return ({url, params, data, onError, onStart, onSuccess, onComplete, options, cache, getResults}) => {
        let cancelToken = new axios.CancelToken((handler) => {
            cancelHandler = handler;
        });
        onStart && onStart();
        return (cache ? ajaxWithCache : ajax)({
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
    };
};
