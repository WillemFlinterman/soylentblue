const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./main.less",
  stats: "minimal",
  watch: true,
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  output: {
    path: path.join(__dirname, "./dist/")
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|otf|woff|mp4)$/i,
        loader: "file-loader",
        options: {
          name(resourcePath, resourceQuery) {
            return '../' + resourcePath.split('soylentblue')[1]
          },
          emitFile: false,
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => autoprefixer()
            }
          },
          {
            loader: "less-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      sourceMap: true
    })
  ]
};
