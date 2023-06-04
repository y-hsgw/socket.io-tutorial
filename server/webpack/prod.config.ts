import baseConfig from "./base.config";
import merge from "webpack-merge";

const config = merge(baseConfig, {
  mode: "production",
});

export default config;
