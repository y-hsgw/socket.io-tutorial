import Dotenv from "dotenv-webpack";
import baseConfig from "./base.config";
import merge from "webpack-merge";

const config = merge(baseConfig, {
  mode: "production",
  plugins: [new Dotenv()],
});

export default config;
