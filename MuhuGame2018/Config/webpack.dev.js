var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var language = require('./language');
const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
const LANGUAGE_CONFIG = language.toollib;

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',

    output: {
        path: helpers.root('wwwroot'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'LANGUAGE_CONFIG': JSON.stringify(LANGUAGE_CONFIG),
            }
        }),
    ],

    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        watchContentBase: true,
        historyApiFallback: true,
        stats: 'minimal'
    }
});