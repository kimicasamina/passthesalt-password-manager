# Passthesalt password manager Restful API

## TODO:

1. [x] - Setup babel, webpack, linting and formatting
2. [x] - Setup git and github workflow
3. [x] - Connect to the database
4. [x] - Create models and associations
5. [x] - Implement authentications and Authorization
6. [x] - Secure the server
7. [x] - Deploy to hosting platform
8. [x] - Implement validations
9. [x] - Error handler and custom error
10. [] - Monitor and handler errors using winston or pino
11. [] - Testing

### 1. Setup and Configurations for dev and prod

#### install code dev

```bash
npm install express sequelize pg dotenv

```

#### Install dev dependencies

```bash
npm install --save-dev nodemon eslint prettier babel-eslint babel-preset-env
```

#### Configure babel (for es6 imports)

1. install babel

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register
```

2. Create a .babelrc or babel.config.js file

```js
// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env', // Allows you to use modern JavaScript (ES6+)
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
};
```

3. Add babel to script for development

```js
"scripts": {
  "dev": "nodemon -r @babel/register src/server.js",
  "start": "node src/server.js"
}
```

#### Linting and Formatting setup

1. Setup prettier and eslint for formatter and linting

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

2. Eslint config

```json
// .eslintrc.json
{
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "env": {
    "node": true,
    "es2021": true
  },
  "rules": {
    "no-console": "warn",
    "prettier/prettier": "error"
  }
}
```

3. Prettier config

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all"
}
```

4. add lint to script including

```js
"scripts": {
  "dev": "nodemon -r @babel/register src/server.js",
  "lint": "eslint src --fix",
  "start": "node src/server.js"
}
```

#### Set Up Babel for Transpiling in Production

1. Install Babel minification plugin

```bash
npm install --save-dev @babel/plugin-transform-runtime @babel/preset-env babel-minify
```

2. Configure Babel for production

```js
// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env', // Enables the use of modern JavaScript (ES6+)
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Handles async/await and generator functions
    'babel-plugin-minify-dead-code-elimination', // Remove dead code
    'babel-plugin-minify-constant-folding', // Minify constant folding
  ],
};
```

#### Set Up Webpack for Code Bundling and Minification

1. Install webpack and related dependencies

```bash
npm install --save-dev webpack webpack-cli webpack-node-externals babel-loader terser-webpack-plugin
```

- webpack-node-externals: This excludes node_modules from being bundled, as they don’t need to be bundled for a server-side application.
- terser-webpack-plugin: Minifies the JavaScript files during the bundling process.

2. Create Webpack Configuration

```js
// webpack.config.js
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
```

3. Update package.json

```js
"scripts": {
    "dev": "nodemon -r @babel/register src/server.js", // For development
    "build": "webpack --config webpack.config.js",     // Build for production
    "start": "node dist/server.bundle.js"              // Start production server
  }
```
