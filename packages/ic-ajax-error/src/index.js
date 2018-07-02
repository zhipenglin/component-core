/**
 * @name: ic-ajax-error ;
 * @author: admin ;
 * @description: 处理ajax错误 ;
 * */

const ERROR_MAP = {
    400: '请求错误',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求出错',
    408: '请求超时',
    500: '服务器错误',
    501: '服务器未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'HTTP版本不受支持'
};

const getAjaxError = (data={}, defaultError = '很抱歉，出错了，请重试~') => {
    let error = [];

    if (data.hasOwnProperty('err_no')) {
        if (data.err_no == '0') {
            return '';
        }
        if (typeof data.results === 'object') {
            Object.keys(data.results).forEach((key) => {
                if (typeof data.results[key] === 'string') {
                    error.push(data.results[key]);
                }
            });
        }
        return error.join(' ') || data.err_msg || defaultError;
    } else {
        Object.keys(data).forEach((key) => {
            const childrenData = data[key];
            if (typeof childrenData === 'object' && childrenData.hasOwnProperty('err_no') && childrenData.err_no != '0') {
                error.push(getAjaxError(childrenData));
            }
        });
        return error.join(' ');
    }
};

export default function ({status, data}, defaultError) {
    if (status < 200 || status > 300) {
        return ERROR_MAP[status] || '连接出错';
    }
    return getAjaxError(data, defaultError);
}
