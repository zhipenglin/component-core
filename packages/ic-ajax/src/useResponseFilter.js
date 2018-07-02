import Filter from "./Filter";

export default (response) => {
    const {errMsg, config} = response;
    if (errMsg !== '') {
        return response;
    }

    return Filter.filterIterator(config.filter, filter =>
        filter.response({
            data: response.data,
            config
        }).then(({data}) => Object.assign(response, {data}))
    ,true).then(() => response);
}
