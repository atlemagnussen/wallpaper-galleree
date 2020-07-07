import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";

const production = !process.env.ROLLUP_WATCH;

export default {
    input: "src/main.js",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "public/build/bundle.js"
    },
    plugins: [
        svelte({
            dev: !production,
            emitCss: false
        }),

        resolve({
            browser: true,
            dedupe: ["svelte"]
        }),
        commonjs(),
        postcss({
            extract: true,
            extensions: [".css", ".scss"],
            minimize: true,
            use: [
                ["sass", {
                    includePaths: [
                        "./src/theme",
                        "./node_modules"
                    ]
                }]
            ]
        }),
        !production && serve({
            contentBase: "public",
            host: "localhost",
            port: 8000,
            historyApiFallback: true,
        }),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload("public"),

        // If we"re building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};
