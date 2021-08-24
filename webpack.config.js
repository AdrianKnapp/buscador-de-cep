const path = require('path');

module.exports = {
  entry: './src/js/script.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'src/js/webpack/main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
