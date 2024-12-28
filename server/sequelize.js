// Enable Babel on the fly for Sequelize CLI
require("@babel/register")({
  extensions: [".js", ".mjs"], // Allow Babel to transpile both .js and .mjs files
  presets: ["@babel/preset-env"],
  plugins: ["@babel/plugin-transform-runtime"],
});

require("sequelize-cli"); // Now load Sequelize CLI after Babel is set up
