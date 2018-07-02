const RULES = {
    REQ: function (value) {
        return {
            result: ((value) => {
                if (typeof value === 'object') {
                    const values = Object.values(value);
                    return values.length > 0 && values.every((item) => !!item);
                } else if (typeof value === 'number') {
                    return !isNaN(value);
                } else {
                    return !(value === undefined || value === null || value === '' || value.length === 0);
                }
            })(value),
            errMsg: ''
        }
    },
    NAME: function (value) {
        return {
            result: !!value && /^[A-Za-z\u4e00-\u9fa5]+$/.test(value),
            errMsg: '请填写有效姓名'
        }
    },
    TEL: function (value) {
        return {
            result: /^1[0-9]{10}$/.test(value),
            errMsg: '请输入有效的手机号'
        }
    },
    EMAIL: function (value) {
        return {
            result: /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value),
            errMsg: '请输入有效的邮箱'
        }
    },
    LEN: function (value, start, end) {
        value = value.toString();
        if (value.length < start) {
            return {
                result: false, errMsg: `%s长度必须大于${start}`
            };
        }
        if (end && value.length > end) {
            return {
                result: false, errMsg: `%s长度必须小于${end}`
            };
        }
        return {result: true};
    }
};
export default RULES;
export const presetRules = (newRules = {}) => {
    Object.assign(RULES, newRules);
};
