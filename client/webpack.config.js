module.exports = {
    entry: "./entry.js",
    output: {
        path: "./build",
        filename: "bundle.js",
        publicPath: "/truth-or-dare/build/",
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.(svg|woff|woff2|eot|dtd|png|gif|jpg|jpeg|ttf)(\?.*)?$/, loader: "file"},
            {test: /\.html$/, loader: "html" },
            {test: /\.json$/, loader: "json" },
            {test: /\.handlebars$/, loader: "handlebars-loader" },
        ]
    },
    devtool: '#inline-source-map',
};