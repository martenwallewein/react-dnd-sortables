const webpackCommon = require('./webpack.config.js');
const path = require('path');


module.exports = {
    ...webpackCommon,
    mode: 'development',

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true
    }
};
