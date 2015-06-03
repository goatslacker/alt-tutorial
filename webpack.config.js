var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [ './src/App.jsx' ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js','jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, 'src')
      ],
      loaders: ['babel']
    }]
  }
};
