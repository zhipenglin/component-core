/**
 * @name: ic-ajax ;
 * @author: admin ;
 * @description: 用于发送ajax请求 ;
 * */

import axios from 'axios'
import useRequestURLEncoded from './useRequestURLEncoded'
import useRequestFilter from './useRequestFilter'
import useResponseError from './useResponseError'
import useResponseFilter from './useResponseFilter'

export {default as Filter} from './Filter'
export const createInstance = (preset) => {
    const ajax = axios.create({
        validateStatus: () => true
    });

    ajax.interceptors.request.use(useRequestURLEncoded);

    ajax.interceptors.request.use(useRequestFilter);

    ajax.interceptors.response.use(useResponseError);

    ajax.interceptors.response.use(useResponseFilter);

    preset && typeof preset === 'function' && preset(ajax);

    return ajax;
};

export default createInstance();
