/**
 * @name: ic-fetch-data ;
 * @author: linzp ;
 * @description: React获取数据容器 ;
 * */

import React from 'react'
import ajax from 'ic-ajax'
import _createDynamic from './createDynamic'

export const createDynamic = _createDynamic;
export const dynamic = createDynamic(ajax);
export const createFetchData = (ajax) => ({url, data, params, ...options}) => (WrappedComponent) => {
    const FetchData = createDynamic(ajax)(WrappedComponent);
    return (props) => <FetchData {...props} url={url} params={params} options={options}/>;
};

export default createFetchData(ajax);
