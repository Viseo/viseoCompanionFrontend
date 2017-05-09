const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: path.resolve('./src/index.js'),
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: require('./babelrc.js'),
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'less-loader', 'css-loader' ]
            },
            {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            }
        ],

    },
    devServer: {
        contentBase: APP_DIR,
        port: 3000,
        historyApiFallback: true,
    },
};