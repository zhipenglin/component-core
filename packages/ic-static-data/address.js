const flatten = require('lodash/flatten'),
    find = require('lodash/find'),
    pick = require('lodash/pick'),
    CITY = require('./data/CITY.json');


const getShortName = (name) => {
    return name.replace(/市$/, '').replace(/(黎族|南?苗族|朝鲜族|蒙古族|哈尼族|壮族|侗族|回族|白族|景颇族|羌族|藏族|彝族|傈僳族|土家族|傣族|南?布依族|自治[区州县]|地区|哈萨克)/g, '');
};

const list = flatten(CITY.map(({children}) => children)), map = {};
list.forEach((item) => {
    map[item.id] = item;
});

const getCityItem = (id) => {
    return map[id];
};

const getProvinceList = () => {
    return CITY.map((item) => {
        return pick(item, ['id', 'name']);
    });
};

const getHotCityList = () => {
    return [33, 105, 231, 229, 119, 268, 106, 201, 321, 148, 215, 110, 34].map((id) => {
        const item = map[id.toString()];
        return Object.assign({}, item, {
            name: getShortName(item.name)
        });
    });
};

const getCityListByProvinceId = (id) => {
    const province = find(CITY, (item) => item.id === id.toString());
    if (province) {
        return province.children;
    } else {
        return [];
    }
};

module.exports = {
    getShortName, getCityItem, getProvinceList, getHotCityList, getCityListByProvinceId, CITY
};
