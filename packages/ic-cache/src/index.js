/**
 * @name: ic-cache ;
 * @author: linzp ;
 * @description: 操作localstore ;
 * */

export function setCache(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};

export function getCache(key, isObject = true) {
    let value = window.localStorage.getItem(key) || '';
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

export function removeCache(key) {
    window.localStorage.removeItem(key);
}

export default {setCache,getCache,removeCache};
