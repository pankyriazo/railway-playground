const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: (resourcePath) => {
                  if (/.*\/*.module.css/.test(resourcePath)) {
                    return "local";
                  }

                  return "global";
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "src"),
    },
    extensions: [".ts", ".js", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Railway Playground",
    }),
  ],
};
