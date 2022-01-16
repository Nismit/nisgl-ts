import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const isUmd = process.env.MODE === "umd" ? true : false;
const isProd = process.env.PROD ? true : false;
const isDev = process.env.DEV ? true : false;

const option = {
  target: isUmd ? "es5" : "es6",
};

export default {
  input: "src/index.ts",
  output: {
    format: isUmd ? "umd" : "esm",
    name: isUmd ? "NISGL" : undefined,
    sourcemap: isDev ? "inline" : false,
  },
  plugins: [
    typescript(option),
    ...(isDev ? [serve({ port: 8080, contentBase: "." })] : []),
    ...(isProd ? [terser()] : []),
  ],
};
