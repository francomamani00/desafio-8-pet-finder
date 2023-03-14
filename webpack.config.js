const path = require("path");
const dev = process.env.NODE_ENV == "development";
console.log(path.resolve(__dirname, "dist"));
const liveServer = require("live-server");
if (dev) {
  liveServer.start({
    root: "./",
    file: "index.html",
  });
}
module.exports = {
  // mode: "development", SE PONE SOLO CUANDO LE DECLARAMOS NODE ENV CON CROSS ENV
  watch: dev,
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "assets/[hash].[ext]" },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx", ".jsx", ".ts", ".png"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
