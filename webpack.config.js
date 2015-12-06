module.exports = {
    entry: "./entry.js",
    output: {
        path: "./build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.(svg|woff|woff2|eot|dtd|png|gif|jpg|jpeg|ttf)(\?.*)?$/, loader: "file"},
            {test: /\.html$/, loader: "html" },
            {test: /\.json$/, loader: "json" },
        ]
    },
    devtool: '#inline-source-map',
};