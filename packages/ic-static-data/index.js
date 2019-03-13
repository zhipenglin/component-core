/**
 * @name: ic-static-data ;
 * @author: admin ;
 * @description: 全局统一的静态数据 ;
 * */

const address = require('./address'),
    degree = require('./degree'),
    jobStatus = require('./job-status');

module.exports = Object.assign({}, address, degree, jobStatus);