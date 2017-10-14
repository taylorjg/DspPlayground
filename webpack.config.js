/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const packageJson = require('./package.json');
const serverPublic = path.join(__dirname, 'server', 'public');

module.exports = [
    {
        entry: [
            './client/index.js'
        ],
        output: {
            path: serverPublic,
            filename: 'bundle.js'
        },
        plugins: [
            new CopyWebpackPlugin([
                { context: './client', from: '*.html' },
                { context: './client', from: '*.css' }
            ]),
            new HtmlWebpackPlugin({
                template: './client/index.html',
                version: packageJson.version
            })
        ],
        devtool: 'source-map',
        devServer: {
            contentBase: serverPublic
        }
    },
    {
        entry: [
            './client/chapter8/dft/index.js'
        ],
        output: {
            path: serverPublic + '/chapter8/dft',
            filename: 'bundle.js'
        },
        plugins: [
            new CopyWebpackPlugin([
                { context: './client/chapter8/dft', from: '*.html' }
            ]),
            new HtmlWebpackPlugin({
                template: './client/chapter8/dft/index.html',
                version: packageJson.version
            })
        ],
        devtool: 'source-map',
        devServer: {
            contentBase: serverPublic
        }
    }
];
