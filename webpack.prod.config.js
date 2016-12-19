﻿const webpack = require("webpack");
const config = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.output.filename = "[name].[chunkhash:8].js";
config.output.chunkFilename = "[id].[chunkhash:8].chunk.js";

config.module.rules.push(
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            loader: "css-loader?minimize",
            fallbackLoader: "style-loader"
        }),
        include: /node_modules/
    },
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
            loader: ["css-loader?minimize", "less-loader"],
            fallbackLoader: "style-loader"
        }),
        include: /node_modules/
    },
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
            loader: [
                "css-loader?modules&minimize&localIdentName=[hash:base64:8]",
                "less-loader"
            ],
            fallbackLoader: "style-loader"
        }),
        exclude: /node_modules/
    }
);

config.plugins.push(
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new ExtractTextPlugin({
        filename: "res/[name].[contenthash:8].css",
        allChunks: true
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

module.exports = config;
