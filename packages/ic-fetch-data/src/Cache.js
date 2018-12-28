import hash from 'object-hash'
import get from 'lodash/get'

export default class Cache {
    static getId({url, params, data, method, baseURL, headers}) {
        return Symbol.for(hash({url, params, data, method, baseURL, headers}));
    }

    constructor() {
        this.__cache = {};
    }

    get allCache() {
        return Object.assign({}, this.__cache);
    }

    getCache(id, namespace = 'global') {
        if (typeof id !== 'symbol') {
            id = this.constructor.getId(id);
        }
        return get(this.__cache, `[${namespace}]`, {})[id];
    }

    append(key, value, namespace = 'global') {
        this.__cache[namespace] = Object.assign({}, this.__cache[namespace], {
            [this.constructor.getId(key)]: value
        });
        return this;
    }

    clean(namespace = 'global') {
        this.__cache[namespace] = {};
        return this;
    }
}

export const globCache = new Cache();
