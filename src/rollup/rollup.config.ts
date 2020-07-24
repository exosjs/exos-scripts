import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import autoExternal from "rollup-plugin-auto-external";
import postcss from "rollup-plugin-postcss-modules";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import json from "@rollup/plugin-json";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import typescript from "@rollup/plugin-typescript";
import { ROOT_PATH, OUTPUT_PATH } from "../common/paths";

export default {
  input: path.resolve(ROOT_PATH, "./src/index.tsx"),
  output: {
    dir: OUTPUT_PATH,
    format: "es" as const,
    sourcemap: true,
    chunkFileNames: "[name].js",
  },
  plugins: [
    commonjs(),
    autoExternal(),
    postcss({
      plugins: [autoprefixer(), csso()],
      modules: {
        generateScopedName: "[name]__[local]--[hash:base64:5]",
        // Class names will be camelized, the original class name will be removed from the locals
        // For more info, see https://github.com/webpack-contrib/css-loader#localsconvention
        localsConvention: "camelCaseOnly",
      },
    }),
    json(),
    url({ limit: Infinity }),
    svgr(),
    typescript(),
  ],
};
