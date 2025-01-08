# Passthesalt

Is a full-stack password manager application designed to securely store and retrieve user login credentials. The system ensures that passwords are encrypted before being saved to the database and can only be decrypted when needed by the client. Built using React.js with Vite and Tailwind CSS for the frontend, and Node.js, Sequelize, and PostgreSQL for the backend, this application is a secure, scalable, and maintainable solution for managing sensitive user information.

## Key Features:

### Secure Password Storage:

- The application uses the crypto library's AES encryption algorithm to encrypt passwords during storage. When a user retrieves their credentials, the system decrypts the password, ensuring sensitive data is protected at all times.

### User Authentication:

- A secure authentication system is implemented using JWT (JSON Web Tokens) to handle user login, registration, and session management. JWT tokens are used to secure API endpoints and ensure only authenticated users can access certain resources, such as password data.

### Database with Sequelize and PostgreSQL:

- The backend uses Sequelize ORM with a PostgreSQL database to create a scalable and maintainable structure for storing user credentials and data. The database is designed to grow with the application, utilizing migrations and models for easy updates and structure management.

### Scalable and Maintainable API:

- The API is built to be both scalable and maintainable, with a focus on security, performance, and code quality. It supports creating, updating, deleting, and retrieving user credentials while keeping security at the forefront with encryption and secure authentication methods.

### Seamless User Registration and Password Hashing:

- During user registration, Sequelize hooks and validations ensure that all inputs are properly validated. Passwords are automatically hashed using bcrypt before being stored in the database, ensuring that even the database cannot access the original password, which adds an additional layer of security against potential breaches.

### Technologies Used:

- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: PostgreSQL, Sequelize ORM
- Security: AES Encryption, JWT, bcrypt

#### Setup and Configurations for dev and prod

1. install code dev

```bash
npm install express sequelize pg dotenv

```

2 Install dev dependencies

```bash
npm install --save-dev nodemon eslint prettier babel-eslint babel-preset-env
```

#### Configure babel (for es6 imports)

1. install babel

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register
```

2. Create a .babelrc or babel.config.js file

````js
// babel.config.js
module.exports = {
  presets: [
    "@babel/preset-env", // Allows you to use modern JavaScript (ES6+)
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
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

4. Setup prettier and eslint for formatter and linting

```bash
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

5. Eslint config

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

6. Prettier config

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all"
}
```
7. add lint to script including
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

4. Update package.json
```js
"scripts": {
    "dev": "nodemon -r @babel/register src/server.js", // For development
    "build": "webpack --config webpack.config.js",     // Build for production
    "start": "node dist/server.bundle.js"              // Start production server
  }
```


### TODO:

1. [] - Minify and transpile the code.
2. [] - Secure environment variables using .env.
3. [] - Monitor and handle errors using tools like winston or pino.

### pm2 to run the app in production

npx pm2 start dist/server.bundle.js --name "my-node-app"

script
"dev": "NODE_ENV=development nodemon src/index.js",
"start:prod": "NODE_ENV=production babel-node src/index.js",
"start:dev": "nodemon --exec babel-node src/index.js",
"start": "node dist/index.js",
"build": "babel src -d dist",
"db:migrate": "sequelize --config sequelize.js db:migrate",
"db:seed": "npx sequelize-cli db:seed:all",
````
