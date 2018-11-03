const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    mode: "development",
    entry: path.resolve('dev/index.tsx'),
    output: {
        path: path.resolve('dist'),
        filename: 'app.js'
    },
    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
    },


    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                ],
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve('public/index.html'),
        })
    ],

};
