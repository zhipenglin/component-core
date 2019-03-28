/**
 * @name: ic-fetch-data ;
 * @author: linzp ;
 * @description: React获取数据容器 ;
 * */

import React from 'react'
import ajax from '@core/ic-ajax'
import _createDynamic from './createDynamic'
import _createListLoader from './createListLoader'

export const createDynamic = _createDynamic;
export const dynamic = createDynamic(ajax);
export const createFetchData = (ajax) => ({url, data, params, cache, loading, error, options, ...args}) => (WrappedComponent) => {
    const FetchData = createDynamic(ajax)(WrappedComponent);
    return (props) => <FetchData {...props} url={url} params={params} data={data}
                                 cache={cache}
                                 loading={loading}
                                 error={error}
                                 options={Object.assign({}, args, options)}/>;
};

export const createListLoader = _createListLoader;
export const dynamicListLoader = createListLoader(ajax);
export const listLoader = (ajax) => ({url, data, params, cache, loading, error, options, ...args}) => (WrappedComponent) => {
    const ListLoader = createListLoader(ajax)(WrappedComponent);
    return (props) => <ListLoader {...props} url={url} data={data} params={params}
                                  cache={cache}
                                  loading={loading}
                                  error={error}
                                  options={Object.assign({}, args, options)}/>;
};

export default createFetchData(ajax);
