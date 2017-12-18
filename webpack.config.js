const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new UglifyJSPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有注释
            comments: false,
            compress:{
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false
            }
        })
    ]
};
