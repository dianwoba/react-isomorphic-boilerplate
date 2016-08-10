const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: [
        'webpack-hot-middleware/client', // for hot reload
        './client/index.js', // entry point for the client app
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './vendor.js',
    },
    resolve: {
        alias: {
            common: `${__dirname}/common`,
            components: `${__dirname}/common/components`,
            static: `${__dirname}/common/static`,
            actions: `${__dirname}/common/actions`,
            api: `${__dirname}/common/api`,
            reducers: `${__dirname}/common/reducers`,
            utils: `${__dirname}/common/utils`,
            constants: `${__dirname}/common/constants`,
        },
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel',
            }, {
                test: /\.less$/,
                loader: 'style!css!postcss!less',
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style', 'css', 'postcss'),
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000',
            },
        ],
    },
    devtool: '#cheap-source-map',
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: process.env.NODE_ENV !== 'production',
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('weui.min.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'client/index.html'),
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
    ].concat(process.env.NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: false,
    }) : []),
};
