const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env) => {


    const puntoenv = dotenv.config().parsed;
  
    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(puntoenv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(puntoenv[next]);
        return prev;
    }, {});

    return {
        entry: './src/index.tsx',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                components: path.resolve(__dirname, './src/components/')
            }
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'build.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        // disable type checker - we will use it in fork plugin
                        transpileOnly: true
                    },
                    exclude: /dist/,
                }
            ],
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new webpack.DefinePlugin({
                'process.env.development': !!(env && !env.production),}),
            new ForkTsCheckerWebpackPlugin({eslint: true})
        ]
    }
};