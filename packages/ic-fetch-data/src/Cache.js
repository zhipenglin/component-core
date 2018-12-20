import hash from 'object-hash'

export default class Cache{
    static getId({url, params, data, method, baseURL, headers}) {
        return Symbol.for(hash({url, params, data, method, baseURL, headers}));
    }

    constructor() {
        this.__cache = {};
    }

    get allCache() {
        return Object.assign({}, this.__cache);
    }

    getCache(id) {
        if (typeof id !== 'symbol') {
            id = this.constructor.getId(id);
        }
        return this.__cache[id];
    }

    append(key, value) {
        this.__cache[this.constructor.getId(key)] = value;
        return this;
    }

    clean() {
        this.__cache = {};
        return this;
    }
}

export const globCache = new Cache();
