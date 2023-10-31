import { readFileSync } from "fs";
import * as path from "path";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { externals } from "rollup-plugin-node-externals";

const pkg = JSON.parse(readFileSync("./package.json"));

const extensions = [".js", ".jsx", ".ts", ".tsx"];

/** @type {import('rollup').RollupOptions} */
export default {
  plugins: [
    externals({ deps: true, devDeps: true, packagePath: "./package.json" }),
    nodeResolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
      exclude: "node_modules/**",
      envName: "production",
      targets: "last 1 chrome versions",
    }),
  ],
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      dir: path.dirname(pkg.main),
      preserveModules: true,
      preserveModulesRoot: "src",
      exports: "named",
    },
    {
      format: "esm",
      dir: path.dirname(pkg.module),
      preserveModules: true,
      exports: "named",
    },
  ],
};
