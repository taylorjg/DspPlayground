/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');
const packageJson = require('./package.json');

const serverPublic = path.join(__dirname, 'server', 'public');
const indexJsFiles = glob.sync('./client/**/index.js');

const indexJsFileToWebpackConfigObject = indexJsFile => {
    const dirName = path.dirname(indexJsFile);
    const dirNameRelativeToClientDir = path.relative('./client', dirName);
    return {
        entry: indexJsFile,
        output: {
            path: path.join(serverPublic, dirNameRelativeToClientDir),
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

module.exports = indexJsFiles.map(indexJsFileToWebpackConfigObject);
