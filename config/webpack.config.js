var path = require('path'),
webpack = require('webpack'),
assets_path = path.join('app', 'assets', 'javascripts');

var config = {
  context: path.resolve(assets_path),
  entry: './entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(assets_path)
  },
  externals: {
    jquery: 'var jQuery'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(assets_path)
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel?presets[]=react,presets[]=es2015"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel?presets[]=react,presets[]=es2015"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': './../node_modules/react',
      'ReactDOM': './../node_modules/react-dom'
    })
  ],
};

module.exports = config;