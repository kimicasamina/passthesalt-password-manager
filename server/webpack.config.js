const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'node', // Make sure to bundle for Node.js environment
  entry: './src/server.js', // Entry point for the app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output folder for bundled files
    filename: 'server.bundle.js', // Output filename
    libraryTarget: 'commonjs2', // Specify commonjs2 for Node.js
  },
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  mode: 'production', // Ensure production mode for optimization
  optimization: {
    minimize: true, // Minify the output
    minimizer: [new TerserPlugin()], // Use Terser for JavaScript minification
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel transpiling to JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              'babel-plugin-minify-dead-code-elimination',
            ],
          },
        },
      },
    ],
  },
};
