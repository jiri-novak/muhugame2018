const Webpack = require('webpack');
const Helpers = require('./helpers');
const Autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientAppRoot = Helpers.root('ClientApp');
const clientAppSrc = Helpers.root('ClientApp', 'app');

const APP_CONFIG = {
    "maxTeams": "36"
};

module.exports = {
    target: 'web',

    entry: {
        'app': [`./ClientApp/polyfills.ts`, `./ClientApp/main.ts`]
    },

    resolve: {
        extensions: ['*', '.ts', '.js']
    },

    module: {
        exprContextCritical: false,
        rules: [
            // angular2 typescript loader
            {
                test: /\.ts$/,
                include: [clientAppRoot],
                loaders: ['awesome-typescript-loader?doTypeCheck=false&useBabel=true&useWebpackText=true ', 'angular2-template-loader', 'angular-router-loader']
            },
            // html loader
            {
                test: /\.html$/,
                loader: 'raw-loader',
                include: [clientAppRoot],
                exclude: [Helpers.root('ClientApp/index.html')]
            },
            // static assets
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
                include: [clientAppRoot],
                loader: 'file-loader?name=assets/[name].[ext]'
            },
            // css loader and inject into components
            {
                test: /\.css$/,
                include: [clientAppSrc],
                loader: ['raw-loader']
            },
            // css global which not include in components
            {
                test: /\.css$/,
                include: [clientAppRoot],
                exclude: [clientAppSrc],
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['raw-loader', 'postcss-loader']
                })
            },
            // SASS loader and inject into components      
            {
                test: /\.scss$/,
                include: [clientAppSrc],
                loaders: ['raw-loader', 'sass-loader']
            },
            // SASS global which not include in components
            {
                test: /\.scss$/,
                include: [clientAppRoot],
                exclude: [clientAppSrc],
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['raw-loader', 'postcss-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([{
            from: `ClientApp/assets/images`,
            to: 'assets/images'
        },
        {
            from: `ClientApp/assets/docs`,
            to: 'assets/docs'
        },
        {
            from: `ClientApp/assets/icons`,
            to: 'assets/icons'
        },
        {
            from: `ClientApp/assets/videos`,
            to: 'assets/videos'
        },
        {
            from: `ClientApp/assets/fonts`,
            to: 'assets/fonts'
        }]),

        new Webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),

        // Tslint configuration for webpack 2
        new Webpack.LoaderOptionsPlugin({
            options: {
				/**
				 * Apply the tslint loader as pre/postLoader
				 * Reference: https://github.com/wbuchwalter/tslint-loader
				 */
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                },
				/**
				 * PostCSS
				 * Reference: https://github.com/postcss/autoprefixer-core
				 * Add vendor prefixes to your css
				 */
                postcss: [
                    Autoprefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        }),

        // Extract css files
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin({
            filename: '[name].css'
        }),

        // new HtmlWebpackPlugin({
        //     template: __dirname + '/../ClientApp/index.html',
        //     // title: METADATA.title,
        //     // chunksSortMode: function (a, b) {
        //     //   const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
        //     //   return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        //     // },
        //     // metadata: METADATA,
        //     // gtmKey: GTM_API_KEY,
        //     inject: 'body',
        //     xhtml: true,
        //     minify: false
        // }),
    ]
};