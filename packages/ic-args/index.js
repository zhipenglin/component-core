/**
 * @name: ic-args ;
 * @author: admin ;
 * @description: 一种用字符串表示对象的格式，通常用于环境变量的配置 ;
 * */

const parse = (args = '', formater) => {
    const output = {};
    (args || '').split(',').filter((str) => {
        const index = str.indexOf(':');
        return index > 0 && index < str.length - 1;
    }).forEach((str) => {
        const [key, ...value] = str.split(':');
        let item = {};
        if (Array.isArray(formater)) {
            formater.forEach((key, index) => {
                item[key] = value[index];
            });
        } else {
            item = value;
        }
        output[key] = item;
    });
    return output;
};

const stringify = (args = {}, formater) => {
    return Object.keys(args).map((key) => {
        const value = args[key];
        let str = '';
        if (Array.isArray(value)) {
            str = value.join(':');
        } else if (Array.isArray(formater) && Object.prototype.toString.call(value) === '[object Object]') {
            str = formater.map((key) => value[key].toString()).join(':');
        } else {
            str = value.toString();
        }
        return `${key}:${str}`;
    }).join(',');
};


module.exports = {stringify,parse};
