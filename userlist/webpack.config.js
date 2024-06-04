const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/hello',
  mode: 'development',
  devServer: {
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'bundle.js',
  //   publicPath: '/'
  // },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      // {
      //   test: /\.png$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: { limit: 8192 },
      //   },
      // },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader',
      //         'css-loader'],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    // new CopyPlugin({
    //   patterns: [
    //       { from: "public", to: "" } //to the dist root directory
    //   ],
    // }),


    new ModuleFederationPlugin({
      name: 'mfeRemote',
      filename: "remoteEntry.js",
      exposes: {
        './App': './src/index',
        './Button': './src/Button', 
        './Hello': './src/hello', 
      },
      shared: {
        ...deps,
        "react-dom": {
          singleton: true,
          eager: true,
        },
        react: {
          singleton: true,
          eager: true,
        },
      },
    }),


  ],
};