module.exports = {
  presets: [
    '@babel/preset-env', // // Enables the ES6
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Handles async/await and generator functions
    'babel-plugin-minify-dead-code-elimination', // remove dead code
    'babel-plugin-minify-constant-folding', // Minify constant folding
    '@babel/plugin-proposal-class-properties', // Allows the use of class properties
  ],
};
