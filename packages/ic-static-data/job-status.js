const JOB_STATUS = require('./data/JOB_STATUS.json');

module.exports = {
    JOB_STATUS, getJobStatus: (key) => JOB_STATUS[key]
};