process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const environment = require("./environment")

environment.plugins.append(
  "CleanWebpackPlugin",
  new CleanWebpackPlugin({ verbose: true, })
)
module.exports = environment.toWebpackConfig()
