import nodeExternals from "webpack-node-externals";
import webpack from "webpack";
import path from "path";

const config: webpack.Configuration = {
  target: "node",
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, "../src/index.ts"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "server.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, "../tsconfig.json"),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};

export default config;
