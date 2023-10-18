import resolve from "rollup-plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
export default {
  input: "src/JS/app.js",
  output: {
    file: "public/JS/bundle.js",
    format: "cjs",
    sourcemap: true,
  },
  plugins: [resolve(), terser(), sourcemaps()],
};
