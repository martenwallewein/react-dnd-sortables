const webpackCommon = require('./webpack.config.js');

module.exports = {
    ...webpackCommon,
    mode: 'production',
    devtool: 'none',

};
