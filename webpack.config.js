var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                  loader: 'babel-loader',
                  query: {
                      presets: ['es2015', 'stage-0']
                  }
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    optimization: {
      minimize: false
    },
    devtool: 'source-map'
};