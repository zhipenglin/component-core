import normalizeHeaderName from 'axios/lib/helpers/normalizeHeaderName'
import merge from "lodash/merge";
import qs from "qs";

export default (config)=>{
    const headers = merge(
        {},
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers || {}
    );
    normalizeHeaderName(headers, 'Content-Type');

    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        try {
            config.data = qs.stringify(config.data);
        } catch (e) {
        }
    }
    return config;
}
