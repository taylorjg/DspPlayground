/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const packageJson = require('./package.json');
const serverPublic = path.join(__dirname, 'server', 'public');

// TODO: find these programmatically
const jsFiles = [
    './client/index.js',
    './client/chapter8/dft/index.js'
];

const jsFileToWebpackConfigObject = jsFile => {
    const dirName = path.dirname(jsFile);
    const relativeName = path.relative('./client', dirName);
    return {
        entry: jsFile,
        output: {
            path: path.join(serverPublic, relativeName),
            filename: 'bundle.js'
        },
        plugins: [
            new CopyWebpackPlugin([
                { context: dirName, from: '*.html' },
                { context: './client', from: '*.css' }
            ]),
            new HtmlWebpackPlugin({
                template: path.join(dirName, 'index.html'),
                version: packageJson.version
            })
        ],
        devtool: 'source-map',
        devServer: {
            contentBase: serverPublic
        }
    };
};

module.exports = jsFiles.map(jsFileToWebpackConfigObject);
