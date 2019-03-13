const DEGREE = require('./data/DEGREE.json');

module.exports = {
    DEGREE, getDegree: (key) => DEGREE[key]
};