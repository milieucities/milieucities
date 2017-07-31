var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        vendor: [path.join(__dirname, "vendors.js")]
    },
    output: {
        path: path.join(__dirname, '../assets', 'javascripts', 'dist', 'dll'),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../assets', 'javascripts', "dll", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname, '../assets', 'javascripts')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        root: path.resolve(__dirname, '../assets', 'javascripts'),
        modulesDirectories: ["node_modules"]
    }
};
