const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  devtool: "eval",
  entry: {
    bundle: path.resolve(__dirname, 'index')
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.resolve(__dirname, "client"),
    modulesDirectories: ["node_modules"]
  },

  output: {
    path: path.resolve(__dirname, '../assets', 'javascripts'),
    publicPath: '/',
    filename: "bundle.js"
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DllReferencePlugin({
            context: path.join(__dirname, '../assets', 'javascripts'),
            manifest: require("./dll/vendor-manifest.json")
        }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin() //Merge chunks
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&plugins[]=lodash',
        include: [
            path.join(__dirname, "client") //important for performance!
        ],
        query: {
            cacheDirectory: true, //important for performance
            plugins: ["transform-regenerator"],
            presets: ["react", "es2015", "stage-0"]
        }
      },
      {
        test: /\.(json|geojson)$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style',
        'css?modules&importLoaders=3&localIdentName=[name]-[local]-[hash:base64:5]',
        'sass',
        'sass-resources']
      },
      {
        test: /\.less$/,
        loaders: ['style-loader',
        'css-loader',
        'less-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style',
        'css?modules&importLoaders=3&localIdentName=[name]-[local]-[hash:base64:5]']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=100000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url'
      }
    ]
  },

  postcss: [autoprefixer],

  sassResources: ['../assets/stylesheets/variables.scss']
}
