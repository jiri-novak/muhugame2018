var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var language = require('./language');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const LANGUAGE_CONFIG = language.toollib;

module.exports = webpackMerge(commonConfig, {
    devtool: 'nosources-source-map',
    output: {
        path: helpers.root('wwwroot'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            minimize: true,
            mangle: {
              keep_fnames: true
            }
          }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'LANGUAGE_CONFIG': JSON.stringify(LANGUAGE_CONFIG),
            }
        }),
    ]
});