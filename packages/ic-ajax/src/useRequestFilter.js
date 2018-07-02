import Filter from './Filter'

export default (config)=>
    Filter.filterIterator(config.filter, (filter) => filter.request(config)).then((newConfig) => Object.assign(config, newConfig));
