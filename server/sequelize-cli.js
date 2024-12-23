// Load Babel Register to transpile code before Sequelize CLI runs
require("@babel/register")({
  extensions: [".js"],
  presets: ["@babel/preset-env"],
});

// Import and run the Sequelize CLI
require("sequelize-cli");
