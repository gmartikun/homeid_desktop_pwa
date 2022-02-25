const { alias, configPaths } = require("react-app-rewire-alias");

const aliasPaths = configPaths("./tsconfig.paths.json");

module.exports = alias(aliasPaths);
